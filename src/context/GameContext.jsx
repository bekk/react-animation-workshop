import React, { createContext, useEffect, useRef } from 'react';
import { chain, intersects, later } from './util';
import { Action, GameState, useGameReducer } from './reducer';

export const GameContext = createContext({});

export const GameContextProvider = ({ children }) => {
    const [state, dispatch] = useGameReducer();
    const playAreaRef = useRef();

    const intersectsPlayArea = (event) => {
        return intersects(event, playAreaRef.current);
    };

    useEffect(() => {
        switch (state.gameState) {
            case GameState.PLAYING: {
                later(1000).then(() => dispatch({ type: Action.COMPARE }));
                break;
            }
            case GameState.KRIG: {
                chain(
                    1000,
                    () => dispatch({ type: Action.PLAY_KRIG }),
                    () => dispatch({ type: Action.PLAY_KRIG }),
                    () => dispatch({ type: Action.PLAY_KRIG }),
                    () => dispatch({ type: Action.PLAY_KRIG }),
                    () => dispatch({ type: Action.COMPARE })
                );
                break;
            }
            case GameState.PREPARE_FOR_WAR: {
                dispatch({ type: Action.INITIATE_WAR });
                break;
            }
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
