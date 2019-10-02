import React, { createContext, useEffect, useRef } from 'react';
import { intersects } from './util';
import { Action, GameState, useGameReducer } from './reducer';

export const GameContext = createContext({});

export const GameContextProvider = ({ children }) => {
    const [state, dispatch] = useGameReducer();
    const playAreaRef = useRef();

    const intersectsPlayArea = (event) => {
        return intersects(event, playAreaRef.current);
    };

    useEffect(() => {
        if (state.gameState === GameState.PLAYING) {
            setTimeout(() => {
                dispatch({ type: Action.COMPARE });
            }, 1000);
        }
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
