import React from 'react';

const formatValue = value => {
    switch (value) {
        case 11: return 'J';
        case 12: return 'Q';
        case 13: return 'K';
        case 1: return 'A';
        default: return value;
    }
};

const CardFace = ({ value }) => {
    return (
        <>
            <div className="Card__top">
                <p>{formatValue(value)}</p>
            </div>
            <div className={`Card__center`}>
                <figure />
            </div>
            <div className="Card__bottom">
                <p>{formatValue(value)}</p>
            </div>
        </>
    );
};

export default CardFace;
