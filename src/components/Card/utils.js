import { Sizes } from '../../constants';
import { CardState } from '../../context/reducer';

const startingPosition = {
    x: 0,
    y: 0
};

const activePosition = {
    x: 0,
    y: Sizes.CARD_HEIGHT + Sizes.CARD_GAP
};

const finishPosition = {
    x: Sizes.CARD_WIDTH + Sizes.CARD_GAP,
    y: Sizes.CARD_HEIGHT + Sizes.CARD_GAP
};

export const getPositionForState = (cardState, cardIndex, player) => {
    const direction = player === 'player' ? -1 : 1;
    const adjustedPosition = (position) => ({
        ...position,
        y: position.y * direction + (cardIndex * 2)
    });
    switch (cardState) {
        case CardState.CLOSED: {
            return { ...startingPosition };
        }
        case CardState.ACTIVE:
        case CardState.KRIG_CLOSED:
        case CardState.KRIG_OPEN: {
            return adjustedPosition(activePosition)
        }
        default: {
            return { ...startingPosition };
        }
    }
};
