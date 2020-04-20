import React, { useContext, useEffect, useState } from 'react';
import CardFace from './CardFace';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Sizes } from '../../constants';
import { GameContext } from '../../context/GameContext';
import { Action, CardState } from '../../context/reducer';
import { getPositionForState } from './utils';
import './Card.less';

const Card = ({
    index,
    value,
    suit,
    state,
    player,
    winner,
}) => {
    const { intersectsPlayArea, dispatch, state: gameState } = useContext(GameContext);
    const [isOpen, setIsOpen] = useState(false);
    const [zIndex, setZIndex] = useState(index);

    // Animasjons-state
    const [rotation, setRotation] = useState((Math.random() - 0.5) * 2);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const isOnTop = gameState.currentPlayerCard === zIndex;
    const isGameOver = gameState.gameState === 'game_over'

    useEffect(() => {
        if (state !== CardState.KRIG_CLOSED) {
            setIsOpen(position.y !== 0);
        }
    }, [position, state]);

    useEffect(() => {
        if (state === CardState.SHUFFLED) {
            setPosition(getPositionForState(state, index, player));
            setRotation(0)
            setIsOpen(false);
            setZIndex(index)
            return
        }
        if (state !== CardState.CLOSED) {
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
        <div
            className={classNames('Card__wrapper', state, player)}
            animate={{ rotate: rotation, ...position }}
            style={{ zIndex, originY: `-${Sizes.CARD_HEIGHT / 2}px` }}
            // TODO: Oppgave 1 og 2 her
        >
            <div className={classNames('Card', isOpen ? 'open' : 'closed', suit)}>
                {isOpen && <CardFace value={value} />}
            </div>
        </div>
    )
};

export default Card;
