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
                <div className="Cell Score">
                    {state.score.computer}
                </div>
                <div className="Cell">
                    <Deck cards={state.computerDeck} />
                </div>
                <div className="Cell playarea_player" ref={playAreaRef} />
                <div className="Cell playarea_computer" />
                <div className="Cell">
                    <Deck cards={state.playerDeck}/>
                </div>
                <div className="Cell Score">
                    {state.score.player}
                </div>
            </div>
        </div>
    )
};

export default App;