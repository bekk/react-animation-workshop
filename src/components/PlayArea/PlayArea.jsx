import React from 'react';
import Deck from '../Deck';
import './PlayArea.less';

const PlayArea = ({ player, position }) => {
    return (
        <div className="PlayArea">
            <Deck cards={player.deck} position={position} />
            <div className={`PlayArea__waste ${position}`} ref={player.wasteRef}>
                <Deck cards={player.waste} isOpen />
            </div>
        </div>
    )
};

export default PlayArea;
