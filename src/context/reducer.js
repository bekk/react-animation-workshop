export const Action = {
    PLAY: 'play'
};

export const CardState = {
    ACTIVE: 'active',
    CLOSED: 'closed'
};

const setActiveCard = (cards, targetIndex) => {
    return cards.map((card, i) => (
        i === targetIndex
            ? { ...card, state: CardState.ACTIVE }
            : card
    ));
};

export const reducer = (state, action) => {
    switch (action.type) {
        case Action.PLAY: {
            return {
                ...state,
                player: {
                    ...state.player,
                    deck: setActiveCard(state.player.deck, state.player.currentCard)
                },
                computer: {
                    ...state.computer,
                    deck: setActiveCard(state.computer.deck, state.computer.currentCard)
                }
            };
        }
        default: {
            return state;
        }
    }
};