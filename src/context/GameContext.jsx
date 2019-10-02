import React, { createContext, useReducer, useRef } from 'react';
import { getCards, intersects } from './util';
import { reducer } from './reducer';

const cards = getCards();

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
    }
};

export const GameContext = createContext({});

export const GameContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const playAreaRef = useRef();

    const intersectsPlayArea = (event) => {
        return intersects(event, playAreaRef.current);
    };

    return (
        <GameContext.Provider value={{
            state,
            dispatch,
            playAreaRef,
            intersectsPlayArea
        }}>
            {children}
        </GameContext.Provider>
    );
};
