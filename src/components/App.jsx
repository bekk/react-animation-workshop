import React, { useContext } from 'react';
import Deck from './Deck';
import { Menu } from './Menu/Menu';
import { GameContext } from '../context/GameContext';
import './App.less';
import { Score } from './Score/Score';

const App = () => {
    const { state, playAreaRef } = useContext(GameContext);

    return (
        <div className="App">
            {
                state.gameState === 'game_over' && (
                    <>
                        <div className="GameOverBackDrop"/>
                        <div className="GameOver">Game Over</div>
                    </>
                )
            }
            <div className="Table">
                <div className="Cell" />
                <div className="Cell">
                    <Deck cards={state.computerDeck} />
                </div>
                <div className="Cell playarea_player" ref={playAreaRef}/>
                <div className="Cell playarea_computer"/>
                <div className="Cell">
                    <Deck cards={state.playerDeck}/>
                </div>
                <div className="Cell" />
            </div>
        </div>
    )
};

export default App;
