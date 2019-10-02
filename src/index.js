import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { GameContextProvider } from './context/GameContext';
import './index.less';

ReactDOM.render(
    <GameContextProvider>
        <App />
    </GameContextProvider>,
    document.getElementById('root')
);
