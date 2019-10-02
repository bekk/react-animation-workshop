import { useReducer } from 'react';
import uuid from 'uuid-random';

export const Action = {
    PLAY: 'play',
    COMPARE: 'compare'
};

export const CardState = {
    ACTIVE: 'active',
    CLOSED: 'closed',
    OWNED_BY_PLAYER: 'player',
    OWNED_BY_COMPUTER: 'computer'
};

export const GameState = {
    IDLE: 'idle',
    PLAYING: 'playing'
};

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suits = ['diamonds', 'clubs', 'hearts', 'spades'];

const shuffle = () => 0.5 - Math.random();

const cards = suits
    .map(suit => values.map(value => ({ suit, value })))
    .reduce((allCards, allCardsInSuit) => allCards.concat(allCardsInSuit), [])
    .map(card => ({ ...card, id: uuid(), state: CardState.CLOSED }))
    .sort(shuffle);

const setActiveCard = player => {
    return {
        ...player,
        deck: player.deck.map((card, i) => (
            i === player.currentCard
                ? { ...card, state: CardState.ACTIVE }
                : card
        ))
    };
};

const setActiveCardWinner = (player, winner) => {
    return {
        ...player,
        currentCard: player.currentCard - 1,
        deck: player.deck.map((card, i) => (
            i === player.currentCard
                ? { ...card, winner }
                : card
        ))
    };
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
        case Action.COMPARE: {
            const playerCard = state.player.deck[state.player.currentCard];
            const computerCard = state.computer.deck[state.computer.currentCard];
            const winner = compareCards(playerCard, computerCard);

            return {
                ...state,
                player: setActiveCardWinner(state.player, winner),
                computer: setActiveCardWinner(state.computer, winner),
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