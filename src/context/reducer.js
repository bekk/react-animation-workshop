import { useReducer } from 'react';
import uuid from 'uuid-random';

export const Action = {
    PLAY: 'play',
    COMPARE: 'compare',
    PLAY_KRIG: 'play_krig'
};

export const CardState = {
    ACTIVE: 'active',
    CLOSED: 'closed',
    OWNED_BY_PLAYER: 'player',
    OWNED_BY_COMPUTER: 'computer',
    KRIG_CLOSED: 'krig_closed',
    KRIG_OPEN: 'krig_open'
};

export const GameState = {
    IDLE: 'idle',
    PLAYING: 'playing',
    KRIG: 'krig'
};

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suits = ['diamonds', 'clubs', 'hearts', 'spades'];

const shuffle = () => 0.5 - Math.random();

const cards = suits
    .map(suit => values.map(value => ({ suit, value })))
    .reduce((allCards, allCardsInSuit) => allCards.concat(allCardsInSuit), [])
    .map(card => ({ ...card, id: uuid(), state: CardState.CLOSED }))
    .sort(shuffle);

const setValueForCurrentCard = (player, key, value) => ({
    ...player,
    deck: player.deck.map((card, i) => (
        i === player.currentCard ? { ...card, [key]: value } : card
    ))
});

const setCardState = (player, state) => {
    return setValueForCurrentCard(player, 'state', state);
};

const setActiveCard = player => {
    return setValueForCurrentCard(player, 'state', CardState.ACTIVE);
};

const setActiveCardWinner = (player, winner) => {
    return setValueForCurrentCard(player, 'winner', winner);
};

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
    player: {
        deck: cards.slice(0, cards.length / 2).map(card => ({ ...card, player: 'player' })),
        currentCard: cards.length / 2 - 1,
        wonCards: []
    },
    computer: {
        deck: cards.slice(cards.length / 2).map(card => ({ ...card, player: 'computer' })),
        currentCard: cards.length / 2 - 1,
        wonCards: []
    },
    gameState: GameState.IDLE
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.PLAY: {
            return {
                ...state,
                player: setActiveCard(state.player),
                computer: setActiveCard(state.computer),
                gameState: GameState.PLAYING
            };
        }
        case Action.PLAY_KRIG: {
            return {
                ...state,
                player: {
                    ...setCardState(state.player, action.cardState),
                    currentCard: state.player.currentCard - 1
                },
                computer: {
                    ...setCardState(state.computer, action.cardState),
                    currentCard: state.computer.currentCard - 1
                }
            }
        }
        case Action.COMPARE: {
            const playerCard = state.player.deck[state.player.currentCard];
            const computerCard = state.computer.deck[state.computer.currentCard];
            const winner = compareCards(playerCard, computerCard);

            if (winner === 'krig') {
                return {
                    ...state,
                    gameState: GameState.KRIG,
                    player: {
                        ...state.player,
                        currentCard: state.player.currentCard - 1
                    },
                    computer: {
                        ...state.computer,
                        currentCard: state.computer.currentCard - 1
                    }
                }
            }

            return {
                ...state,
                player: {
                    ...setActiveCardWinner(state.player, winner),
                    currentCard: state.player.currentCard - 1,
                },
                computer: {
                    ...setActiveCardWinner(state.computer, winner),
                    currentCard: state.computer.currentCard - 1,
                },
                gameState: GameState.IDLE
            }
        }
        default: {
            return state;
        }
    }
};

export const useGameReducer = () => {
    return useReducer(reducer, initialState);
};