import React from 'react';
import Deck from '../Deck';
import Waste from '../Waste';
import './PlayArea.less';

const PlayArea = ({ player, direction }) => {
    return (
        <div className="PlayArea">
            <Deck cards={player.deck} direction={direction} />
            <Waste
                cards={player.waste}
                direction={direction}
                forwardRef={player.wasteRef}
            />
        </div>
    )
};

export default PlayArea;
