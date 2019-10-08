import React, { useContext, useEffect, useState } from 'react';
import CardFace from './CardFace';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Sizes } from '../../constants';
import { GameContext } from '../../context/GameContext';
import { Action, CardState } from '../../context/reducer';
import './Card.less';

const getPositionForState = (cardState, cardIndex, player) => {
    const direction = player === 'player' ? -1 : 1;
    const activeYTransform = (Sizes.CARD_HEIGHT + Sizes.CARD_GAP) * direction + (cardIndex * 2);
    switch (cardState) {
        case CardState.CLOSED: {
            return {
                x: 0,
                y: 0
            };
        }
        case CardState.ACTIVE:
        case CardState.KRIG_CLOSED:
        case CardState.KRIG_OPEN: {
            return {
                x: 0,
                y: activeYTransform
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
    player,
    winner
}) => {
    const { intersectsPlayArea, dispatch } = useContext(GameContext);
    const [isOpen, setIsOpen] = useState(false);
    const [zIndex, setZIndex] = useState(index);

    // Animasjons-state
    const [rotation, setRotation] = useState((Math.random() - 0.5) * 2);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (state !== CardState.KRIG_CLOSED) {
            setIsOpen(position.y !== 0);
        }
    }, [position, state]);

    useEffect(() => {
        if (
            state === CardState.ACTIVE ||
            state === CardState.KRIG_OPEN ||
            state === CardState.KRIG_CLOSED
        ) {
            setPosition(getPositionForState(state, index, player));
            setZIndex(-index)
        }
    }, [state]);

    useEffect(() => {
        if (winner) {
            const direction = winner === 'player' ? -1 : 1;
            const swapFactor = winner === player ? 1 : 2;
            setPosition({
                y: position.y + (0.5 - Math.random()) * 25,
                x: (Sizes.CARD_WIDTH + Sizes.CARD_GAP) * swapFactor * direction,
            });
            setRotation((Math.random() - 0.5) * 25);
        }
    }, [winner]);

    return (
        <motion.div
            className={classNames('Card__wrapper', state, player)}
            animate={{
                rotate: rotation,
                ...position
            }}
            style={{
                zIndex,
                originY: `-${Sizes.CARD_HEIGHT / 2}px`
            }}
            // OPPGAVE 1 //
            drag={state === CardState.CLOSED}
            dragElastic={1}
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0
            }}
            onDragEnd={(event) => {
                if (intersectsPlayArea(event)) {
                    dispatch({ type: Action.PLAY });
                }
            }}
            ///////////////
            whileHover={{
                scale: 1.05
            }}
        >
            <motion.div className={classNames('Card', isOpen ? 'open' : 'closed', suit)}>
                {isOpen && <CardFace value={value} />}
            </motion.div>
        </motion.div>
    )
};

export default Card;