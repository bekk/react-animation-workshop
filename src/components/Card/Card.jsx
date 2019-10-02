import React, { useContext, useEffect, useState } from 'react';
import CardFace from './CardFace';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Sizes } from '../../constants';
import { GameContext } from '../../context/GameContext';
import { Action, CardState } from '../../context/reducer';
import './Card.less';

const getPositionForState = (cardState, cardIndex, player) => {
    const yFactor = player === 'player' ? -1 : 1;

    switch (cardState) {
        case CardState.CLOSED: {
            return {
                x: 0,
                y: 0
            };
        }
        case CardState.ACTIVE: {
            return {
                x: 0,
                y: (Sizes.CARD_HEIGHT + Sizes.CARD_GAP) * yFactor + (cardIndex * 2)
            }
        }
        default: {
            return { x: 0, y: 0 };
        }
    }
};

const Card = ({
    index,
    value,
    suit,
    state,
    player
}) => {

    const { intersectsPlayArea, dispatch } = useContext(GameContext);
    const [isOpen, setIsOpen] = useState(false);
    const [zIndex, setZIndex] = useState(index);

    // Animasjons-state
    const [rotation, setRotation] = useState((Math.random() - 0.5) * 2);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsOpen(position.y !== 0);
    }, [position]);

    useEffect(() => {
        if (state === CardState.ACTIVE) {
            setPosition(getPositionForState(state, index, player));
            setZIndex(-index)
        }
    }, [state]);

    return (
        <motion.div
            className={classNames('Card__wrapper', state, player)}
            animate={{
                rotate: rotation,
                ...position
            }}
            style={{ zIndex }}
            drag={state === CardState.CLOSED}
            dragElastic={1}
            dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }}
            onDragEnd={(event) => {
                if (intersectsPlayArea(event)) {
                    dispatch({ type: Action.PLAY });
                }
            }}
        >
            <motion.div className={classNames('Card', isOpen ? 'open' : 'closed', suit)}>
                {isOpen && <CardFace value={value} />}
            </motion.div>
        </motion.div>
    )
};

export default Card;