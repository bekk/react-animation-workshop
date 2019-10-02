import { useReducer } from 'react';
import uuid from 'uuid-random';

export const Action = {
    PLAY: 'play'
};

export const CardState = {
    ACTIVE: 'active',
    CLOSED: 'closed'
};

export const GameState = {
    IDLE: 'idle'
};

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suits = ['diamonds', 'clubs', 'hearts', 'spades'];

const shuffle = () => 0.5 - Math.random();

const cards = suits
    .map(suit => values.map(value => ({ suit, value })))
    .reduce((allCards, allCardsInSuit) => allCards.concat(allCardsInSuit), [])
    .map(card => ({ ...card, id: uuid(), state: CardState.CLOSED }))
    .sort(shuffle);

const setActiveCard = (cards, targetIndex) => {
    return cards.map((card, i) => (
        i === targetIndex
            ? { ...card, state: CardState.ACTIVE }
            : card
    ));
};

export const reducer = (state, action) => {
    switch (action.type) {
        case Action.PLAY: {
            return {
                ...state,
                player: {
                    ...state.player,
                    deck: setActiveCard(state.player.deck, state.player.currentCard)
                },
                computer: {
                    ...state.computer,
                    deck: setActiveCard(state.computer.deck, state.computer.currentCard)
                }
            };
        }
        default: {
            return state;
        }
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

export const useGameReducer = () => {
    return useReducer(reducer, initialState);
};