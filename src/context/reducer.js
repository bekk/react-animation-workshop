import { useReducer } from 'react';
import uuid from 'uuid-random';

export const Action = {
    PLAY: 'play',
    COMPARE: 'compare',
    PLAY_KRIG: 'play_krig',
    INITIATE_WAR: 'initiate_war'
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
    KRIG: 'krig',
    PREPARE_FOR_WAR: 'prepare_for_war'
};

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suits = ['diamonds', 'clubs', 'hearts', 'spades'];

const shuffle = () => 0.5 - Math.random();

const cards = suits
    .map(suit => values.map(value => ({ suit, value })))
    .reduce((allCards, allCardsInSuit) => allCards.concat(allCardsInSuit), [])
    .map(card => ({ ...card, id: uuid(), state: CardState.CLOSED }))
    .sort(shuffle);

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
    console.log('comparing player', playerCard.value, 'to computer', computerCard.value);
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
    currentCard: cards.length / 2 - 1,
    gameState: GameState.IDLE,
    warCounter: 0
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.PLAY: {
            return {
                ...state,
                playerDeck: withUpdatedCard(state.playerDeck, state.currentCard, 'state', CardState.ACTIVE),
                computerDeck: withUpdatedCard(state.computerDeck, state.currentCard, 'state', CardState.ACTIVE),
                gameState: GameState.PLAYING
            };
        }
        case Action.PLAY_KRIG: {
            const endOfWar = state.warCounter !== 0 && state.warCounter % 3 === 0;
            const cardState = endOfWar ? CardState.KRIG_OPEN : CardState.KRIG_CLOSED;
            return {
                ...state,
                playerDeck: withUpdatedCard(state.playerDeck, state.currentCard, 'state', cardState),
                computerDeck: withUpdatedCard(state.computerDeck, state.currentCard, 'state', cardState),
                currentCard: endOfWar ? state.currentCard : state.currentCard - 1,
                warCounter: endOfWar ? state.warCounter : state.warCounter + 1
            }
        }
        case Action.COMPARE: {
            const playerCard = state.playerDeck[state.currentCard];
            const computerCard = state.computerDeck[state.currentCard];
            const winner = compareCards(playerCard, computerCard);

            console.log('winner:', winner);

            if (winner === 'krig') {
                return {
                    ...state,
                    gameState: GameState.PREPARE_FOR_WAR,
                    currentCard: state.currentCard - 1
                }
            }

            if (state.warCounter > 0) {
                const from = state.currentCard;
                const to = state.currentCard + state.warCounter + 1;
                return {
                    ...state,
                    playerDeck: withUpdatedCards(state.playerDeck, from, to, 'winner', winner),
                    computerDeck: withUpdatedCards(state.computerDeck, from, to, 'winner', winner),
                    gameState: GameState.IDLE,
                    currentCard: state.currentCard - 1,
                    warCounter: 0
                };
            }

            return {
                ...state,
                playerDeck: withUpdatedCard(state.playerDeck, state.currentCard, 'winner', winner),
                computerDeck: withUpdatedCard(state.computerDeck, state.currentCard, 'winner', winner),
                gameState: GameState.IDLE,
                currentCard: state.currentCard - 1
            }
        }
        case Action.INITIATE_WAR: {
            return {
                ...state,
                gameState: GameState.KRIG
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