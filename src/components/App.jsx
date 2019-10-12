import React, { useContext } from 'react';
import Deck from './Deck';
import { GameContext } from '../context/GameContext';
import './App.less';
import { Menu } from './Menu/Menu';

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
                <div className="Cell playarea_player" ref={playAreaRef} />
                <div className="Cell playarea_computer" />
                <div className="Cell">
                    <Deck cards={state.playerDeck}/>
                </div>
                <div className="Cell" />
            </div>
        </div>
    )
};

export default App;