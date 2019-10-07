Det eneste du trenger å endre i oppgave 1 og 2 er props'ene til den ytterste `<motion.div>`'en i `return`-metoden til `Card`-komponenten. Den kan se slik ut:

```js
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
```