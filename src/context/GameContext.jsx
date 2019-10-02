import React, { createContext, useState, useRef, useCallback, useEffect } from 'react';
import uuid from 'uuid-random';

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suits = ['diamonds', 'clubs', 'hearts', 'spades'];

const shuffle = deck => [...deck].sort(() => 0.5 - Math.random());

const cards = suits
    .map(suit => values.map(value => ({ suit, value })))
    .reduce((allCards, allCardsInSuit) => allCards.concat(allCardsInSuit), [])
    .map(card => ({
        ...card,
        id: uuid(),
        initial: { x: 0, y: 0 }
    }));

const initialDeck = shuffle(cards);

export const GameContext = createContext({});

const usePlayer = (cards) => {
    const [deck, setDeck] = useState(cards);
    const [waste, setWaste] = useState([]);
    const wasteRef = useRef();
    const currentCard = useRef();

    const playCard = useCallback(initialPosition => {
        const card = {
            ...[...deck].pop(),
            initial: initialPosition
        };

        if (card) {
            currentCard.current = card;
            setDeck(deck.slice(0, deck.length - 1));
            setWaste([...waste, card]);
        }

        return card;
    }, [deck, waste]);

    return {
        deck,
        waste,
        wasteRef,
        currentCard,
        playCard,
    };
};

const compareCards = (humanCard, computerCard) => {
    if (humanCard.value - computerCard.value === 0) {
        return 'krig';
    } else if (humanCard.value === 1 || (humanCard.value > computerCard.value && computerCard.value !== 1)) {
        return 'human';
    } else {
        return 'computer';
    }
};

const GameContextProvider = ({ children }) => {
    const humanPlayer = usePlayer(initialDeck.slice(0, initialDeck.length / 2));
    const computerPlayer = usePlayer(initialDeck.slice(initialDeck.length / 2));
    const [scores, setScores] = useState({ human: 0, computer: 0 });

    const playCard = activeCardPosition => {
        const humanCard = humanPlayer.playCard(activeCardPosition);
        const computerCard = computerPlayer.playCard({ x: 0, y: -226 });

        const winner = compareCards(humanCard, computerCard);
    };

    return (
        <GameContext.Provider value={{
            humanPlayer,
            computerPlayer,
            playCard,
            scores
        }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContextProvider;