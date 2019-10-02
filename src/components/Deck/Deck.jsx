import React from 'react';
import Card from '../Card';
import './Deck.less';

const Deck = ({ cards }) => {
    return (
        <div className="Deck">
            {cards.map((card, i) => (
                <Card
                    key={card.id + '-deck'}
                    index={i}
                    {...card}
                />
            ))}
        </div>
    );
};

export default Deck;
