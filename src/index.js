import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.less';
import GameContextProvider from './context/GameContext';

ReactDOM.render(
    <GameContextProvider>
        <App />
    </GameContextProvider>,
    document.getElementById('root')
);
