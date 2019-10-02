import React from 'react';
import Card from '../Card';
import './Deck.less';

const Deck = ({ cards, direction, position, isOpen }) => {
    return (
        <div className={`Deck ${position ? position : 'waste'}`}>
            {cards.map((card, i) => (
                <Card
                    key={card.id + '-deck'}
                    direction={direction}
                    isOnTop={i === cards.length - 1}
                    isOpen={isOpen}
                    {...card}
                />
            ))}
        </div>
    );
};

export default Deck;
