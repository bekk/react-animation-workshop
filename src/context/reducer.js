import { useReducer } from 'react';
import uuid from 'uuid-random';
import { shuffle } from 'lodash'

export const Action = {
    PLAY: 'play',
    COMPARE: 'compare',
    PLAY_KRIG: 'play_krig',
    INITIATE_WAR: 'initiate_war',
    SHUFFLE_DECK: 'shuffle_deck',
    GAME_OVER: 'game_over',
    RESET_DECK: 'reset_deck',
};

export const CardState = {
    ACTIVE: 'active',
    CLOSED: 'closed',
    OWNED_BY_PLAYER: 'player',
    OWNED_BY_COMPUTER: 'computer',
    KRIG_CLOSED: 'krig_closed',
    KRIG_OPEN: 'krig_open',
    SHUFFLED: 'shuffled'
};

export const GameState = {
    IDLE: 'idle',
    PLAYING: 'playing',
    KRIG: 'krig',
    PREPARE_FOR_WAR: 'prepare_for_war',
    CHECK_FOR_SHUFFLE: 'check_for_shuffle',
    GAME_OVER: 'game_over',
    RESET_DECK: 'reset_deck',
};

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suits = ['diamonds', 'clubs', 'hearts', 'spades'];

const shuffleDeck = () => 0.5 - Math.random();

const cards = suits
    .map(suit => values.map(value => ({ suit, value })))
    .reduce((allCards, allCardsInSuit) => allCards.concat(allCardsInSuit), [])
    .map(card => ({ ...card, id: uuid(), state: CardState.CLOSED, winner: undefined }))
    .sort(shuffleDeck);

const withUpdatedCard = (deck, cardIndex, key, value) => (
    deck.map((card, i) => (
        i === cardIndex ? { ...card, [key]: value} : card
    ))
);

const withUpdatedCards = (deck, from, to, key, value) => (
    deck.map((card, i) => (
        i >= from && i <= to
            ? { ...card, [key]: value }
            : card
    ))
);

const compareCards = (playerCard, computerCard) => {
    if (playerCard.value === computerCard.value) {
        return 'krig';
    } else if ((playerCard.value > computerCard.value || playerCard.value === 1) && computerCard.value !== 1) {
        return 'player';
    } else {
        return 'computer';
    }
};

const initialState = {
    playerDeck: cards.slice(0, cards.length / 2).map(card => ({ ...card, player: 'player' })),
    computerDeck: cards.slice(cards.length / 2).map(card => ({ ...card, player: 'computer' })),
    currentPlayerCard: cards.length / 2 - 1,
    currentComputerCard: cards.length / 2 - 1,
    gameState: GameState.IDLE,
    warCounter: 0,
    score: {
        player: 0,
        computer: 0
    }
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.PLAY: {
            return {
                ...state,
                playerDeck: withUpdatedCard(state.playerDeck, state.currentPlayerCard, 'state', CardState.ACTIVE),
                computerDeck: withUpdatedCard(state.computerDeck, state.currentComputerCard, 'state', CardState.ACTIVE),
                nextGameState: GameState.PLAYING,
                gameState: GameState.CHECK_FOR_SHUFFLE
            };
        }
        case Action.PLAY_KRIG: {
            if (state.currentPlayerCard < 0 || state.currentComputerCard < 0) {
                return {
                    ...state,
                    gameState: 'game_over',
                    nextGameState: undefined,
                };
            }
            const endOfWar =
                (state.warCounter !== 0 && state.warCounter % 3 === 0) || state.currentPlayerCard === 0 || state.currentComputerCard === 0;

            const cardState = endOfWar ? CardState.KRIG_OPEN : CardState.KRIG_CLOSED;

            return {
                ...state,
                playerDeck: withUpdatedCard(state.playerDeck, state.currentPlayerCard, 'state', cardState),
                computerDeck: withUpdatedCard(state.computerDeck, state.currentComputerCard, 'state', cardState),
                currentPlayerCard: endOfWar ? state.currentPlayerCard : state.currentPlayerCard - 1,
                currentComputerCard: endOfWar ? state.currentComputerCard : state.currentComputerCard - 1,
                warCounter: endOfWar ? state.warCounter : state.warCounter + 1,
                gameState: GameState.CHECK_FOR_SHUFFLE,
                nextGameState: cardState,
            }
        }
        case Action.COMPARE: {
            if (state.gameState === 'game_over') return state

            const indexPlayer = state.currentPlayerCard < 0 ? 0 : state.currentPlayerCard;
            const indexComputer = state.currentComputerCard < 0 ? 0 : state.currentComputerCard;

            if (indexPlayer === -1 || indexComputer === -1) return

            const playerCard = state.playerDeck[indexPlayer];
            const computerCard = state.computerDeck[indexComputer];
            const winner = compareCards(playerCard, computerCard);

            if (winner === 'krig') {
                return {
                    ...state,
                    gameState: GameState.CHECK_FOR_SHUFFLE,
                    nextGameState: GameState.PREPARE_FOR_WAR,
                    currentPlayerCard: state.currentPlayerCard - 1,
                    currentComputerCard: state.currentComputerCard - 1
                }
            }

            if (state.warCounter > 0) {
                const playerFrom = state.currentPlayerCard;
                const playerTo = state.currentPlayerCard + state.warCounter + 1;

                const computerFrom = state.currentComputerCard;
                const computerTo = state.currentComputerCard + state.warCounter + 1;

                const updatedPlayerDeckClosed = withUpdatedCards(state.playerDeck, playerFrom, playerTo, 'winner', winner)
                const updatedComputerDeckClosed = withUpdatedCards(state.computerDeck, computerFrom, computerTo, 'winner', winner)
                return {
                    ...state,
                    playerDeck: withUpdatedCards(updatedPlayerDeckClosed, playerFrom, playerTo, 'state', CardState.CLOSED),
                    computerDeck: withUpdatedCards(updatedComputerDeckClosed, computerFrom, computerTo, 'state', CardState.CLOSED),
                    gameState: GameState.IDLE,
                    // gameState: GameState.CHECK_FOR_SHUFFLE,
                    // nextGameState: GameState.IDLE,
                    currentPlayerCard: state.currentPlayerCard - 1,
                    currentComputerCard: state.currentComputerCard - 1,
                    warCounter: 0,
                    score: winner === 'player'
                        ? { ...state.score, player: state.score.player + 2 + (state.warCounter + 1) * 2 }
                        : { ...state.score, computer: state.score.computer + 2 + (state.warCounter + 1) * 2 }
                };
            }

            return {
                ...state,
                playerDeck: withUpdatedCard(state.playerDeck, state.currentPlayerCard, 'winner', winner),
                computerDeck: withUpdatedCard(state.computerDeck, state.currentComputerCard, 'winner', winner),
                gameState: GameState.CHECK_FOR_SHUFFLE,
                nextGameState: GameState.IDLE,
                currentPlayerCard: state.currentPlayerCard - 1,
                currentComputerCard: state.currentComputerCard - 1,
                score: winner === 'player'
                    ? { ...state.score, player: state.score.player + 2 }
                    : { ...state.score, computer: state.score.computer + 2 }
            }
        }

        case Action.SHUFFLE_DECK: {
            const { playerDeck, computerDeck, nextGameState, currentPlayerCard, currentComputerCard } = state

            const isPlayerOutOfCard = playerDeck.every(card => {
                return card.winner !== undefined
            })

            const isComputerOutOfCard = computerDeck.every(card => {
                return card.winner !== undefined
            })

            if (!isPlayerOutOfCard && !isComputerOutOfCard) {
                return {
                    ...state,
                    gameState: state.nextGameState,
                    nextGameState: undefined,
                }
            }

            let newPlayerDeck = []
            let newComputerDeck = []

            if (isPlayerOutOfCard) {
                newPlayerDeck = [...playerDeck, ...computerDeck].filter(card => card.winner === 'player')
                    .map(card => {
                        return {
                            ...card,
                            player: 'player',
                            state: CardState.SHUFFLED,
                            winner: undefined,
                        }
                    })

                if ((nextGameState === GameState.KRIG && newPlayerDeck.length < 5) || !newPlayerDeck.length) {
                    return {
                        ...state,
                        playerDeck: newPlayerDeck,
                        gameState: GameState.GAME_OVER,
                        nextGameState: undefined,
                    }
                }
            }

            if (isComputerOutOfCard) {
                newComputerDeck = [...playerDeck, ...computerDeck].filter(card => card.winner === 'computer')
                    .map(card => {
                        return {
                            ...card,
                            player: 'computer',
                            state: CardState.SHUFFLED,
                            winner: undefined,
                        }
                    })

                if ((nextGameState === GameState.KRIG && newComputerDeck.length < 5) || !newComputerDeck.length) {
                    return {
                        ...state,
                        gameState: GameState.GAME_OVER,
                        nextGameState: undefined,
                    }
                }
            }

            return {
                ...state,
                playerDeck: currentPlayerCard === -1 && (isPlayerOutOfCard) ? shuffle(newPlayerDeck) : state.playerDeck,
                computerDeck: currentComputerCard === -1 && (isComputerOutOfCard) ? shuffle(newComputerDeck) : state.computerDeck,
                nextGameState: nextGameState,
                gameState: GameState.RESET_DECK,
                currentPlayerCard: currentPlayerCard === -1 && (isPlayerOutOfCard) ? newPlayerDeck.length - 1 : state.currentPlayerCard,
                currentComputerCard: currentComputerCard === -1 && (isComputerOutOfCard) ? newComputerDeck.length - 1 : state.currentComputerCard,
            }
        }
        case Action.RESET_DECK: {
            return {
                ...state,
                playerDeck: state.playerDeck.map(card => {
                    return {
                        ...card,
                        state: CardState.CLOSED,
                    }
                }),
                computerDeck: state.computerDeck.map(card => {
                    return {
                        ...card,
                        state: CardState.CLOSED,
                    }
                }),
                gameState: state.nextGameState,
                nextGameState: undefined,
            }
        }
        case Action.INITIATE_WAR: {
            if (state.gameState === 'game_over') return state

            return {
                ...state,
                gameState: GameState.CHECK_FOR_SHUFFLE,
                nextGameState: GameState.KRIG,
            }
        }
        default: {
            return state
        }
    }
};

export const useGameReducer = () => {
    return useReducer(reducer, initialState);
};
