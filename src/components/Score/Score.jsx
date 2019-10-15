import React from 'react';
import './Score.less';

export const Score = (props) => {
    return (
        <React.Fragment>
            <span className="Score player">
                {props.playerScore}
            </span>
            <span className="Score computer">
                {props.computerScore}
            </span>
        </React.Fragment>
    )
}