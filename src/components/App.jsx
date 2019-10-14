import React, { useContext } from 'react';
import Deck from './Deck';
import { Menu } from './Menu/Menu';
import { GameContext } from '../context/GameContext';
import './App.less';

const App = () => {
    const { state, playAreaRef } = useContext(GameContext);

    return (
        <div className="App">
            <div className="MenuContainer">
                <Menu />
            </div>
            <div className="Table">
                <div className="Cell" />
                <div className="Cell">
                    <Deck cards={state.computerDeck} />
                </div>
                <div className="Cell playarea_player" ref={playAreaRef}>
                    <span className="Score player">
                        {state.score.player}
                    </span>
                </div>
                <div className="Cell playarea_computer">
                    <span className="Score computer">
                        {state.score.computer}
                    </span>
                </div>
                <div className="Cell">
                    <Deck cards={state.playerDeck}/>
                </div>
                <div className="Cell" />
            </div>
        </div>
    )
};

export default App;