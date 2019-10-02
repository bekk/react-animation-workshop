import React from 'react';
import Card from '../Card';
import './Waste.less';

const Waste = ({ cards, direction, forwardRef }) => {
    return (
        <div className={`Waste ${direction}`} ref={forwardRef}>
            {cards.map(card => (
                <Card
                    key={card.id + '-deck'}
                    direction={direction}
                    isOpen
                    {...card}
                />
            ))}
        </div>
    );
};

export default Waste;
