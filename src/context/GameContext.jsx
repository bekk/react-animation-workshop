import React, { createContext, useEffect, useRef } from 'react';
import { intersects } from './util';
import { useGameReducer } from './reducer';

export const GameContext = createContext({});

export const GameContextProvider = ({ children }) => {
    const [state, dispatch] = useGameReducer();
    const playAreaRef = useRef();

    const intersectsPlayArea = (event) => {
        return intersects(event, playAreaRef.current);
    };

    useEffect(() => {
        console.log(state.gameState);
    }, [state.gameState]);

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
