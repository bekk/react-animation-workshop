import React, { useContext } from 'react';
import PlayArea from './PlayArea';
import { GameContext } from '../context/GameContext';
import './App.less';

const App = () => {
    const { humanPlayer, computerPlayer, scores } = useContext(GameContext);

    return (
        <div className="App">
            <div className="Scores">
                <p>Player: {scores.human}</p>
                <p>Computer: {scores.computer}</p>
            </div>
            <PlayArea player={humanPlayer} position="left" />
            <PlayArea player={computerPlayer} position="right" />
        </div>
    )
};

export default App;