import uuid from 'uuid-random';
import { CardState } from './reducer';

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suits = ['diamonds', 'clubs', 'hearts', 'spades'];

const shuffle = deck => [...deck].sort(() => 0.5 - Math.random());

const cards = suits
    .map(suit => values.map(value => ({ suit, value })))
    .reduce((allCards, allCardsInSuit) => allCards.concat(allCardsInSuit), [])
    .map(card => ({ ...card, id: uuid(), state: CardState.CLOSED }));

export const getCards = () => {
    return shuffle(cards);
};

export const getPosition = element => {
    const position = {
        x: element.offsetLeft,
        y: element.offsetTop
    };

    let parent = element.offsetParent;
    while (parent) {
        position.y += parent.offsetTop;
        position.x += parent.offsetLeft;
        parent = parent.offsetParent;
    }

    return position;
};

export const intersects = (event, element, offset = 5) => {
    const elementPosition = getPosition(element);
    return event.clientX >= elementPosition.x - offset
        && event.clientY >= elementPosition.y - offset
        && event.clientX <= elementPosition.x + element.offsetWidth + offset
        && event.clientY <= elementPosition.y + element.offsetHeight + offset;
};