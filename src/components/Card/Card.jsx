import React, { useContext } from 'react';
import CardFace from './CardFace';
import { motion } from 'framer-motion';
import { GameContext } from '../../context/GameContext';
import { intersects } from '../../util/intersects';
import './Card.less';

const Card = ({
    value,
    suit,
    id,
    initial = { x: 0, y: 0 },
    position = { x: 0, y: 0 },
    isOpen = false,
    isOnTop = false
}) => {
    const { humanPlayer, playCard } = useContext(GameContext);
    const isDraggable = !isOpen && isOnTop;

    return (
        <motion.div
            className={`Card__wrapper ${isOpen ? 'open' : 'closed'}`}
            key={id}
            drag={isDraggable}
            dragElastic={1}
            dragConstraints={isDraggable && { top: 0, right: 0, bottom: 0, left: 0 }}
            onDragEnd={(event, info) => {
                if (intersects(event, humanPlayer.wasteRef.current)) {
                    playCard({x: info.offset.x, y: info.offset.y + 226 });
                }
            }}
            initial={initial}
            animate={position}
        >
            <div className={`Card ${isOpen ? 'open' : 'closed'} ${suit}`}>
                {isOpen && <CardFace value={value} />}
            </div>
        </motion.div>
    )
};

export default Card;