# react-animation-workshop
Animasjonsworkshop for React-faggruppen 2019!

# Introduksjon
Velkommen til animasjonsworkshop! I denne workshopen skal du få leke deg med et relativt nytt animasjonsrammeverk: **Framer Motion**! Versjon 1 av Framer Motion ble lansert i juni i år, og er etterfølgeren til *Pose*, for de som er kjent med det. For en kort intro til Framer Motion kan du lese [denne artikkelen](https://medium.com/better-programming/smooth-animations-with-react-and-framer-motion-c272b6f22f67).

Selve dokumentasjonen til Framer Motion API'et [finner du her](https://www.framer.com/api/motion/?source=post_page-----c272b6f22f67----------------------), hvor du blant annet finner enkle eksempler til de mest grunnleggende funksjonene og mulighetene API'et gir. 

Tips: Under "Examples", scroll helt ned til "More", så finner du lenker til fungerende kodeeksempler i CodeSandbox!

Lest introduskjonsartikkelen? Da får det være nok introduksjon, så la oss bare komme i gang!

## Emoji-guide

Du kommer til å se noen emojis i oppgavene. De betyr ca det her:

🏆Oppgave: Her er hva du skal gjøre

💡Tips: Litt ekstra info som kan være greit å være for å løse en oppgave

<details>
  <summary>🚨Løsningsforslag: Klikk meg! 😊</summary>

Her finner du en komplett gjennomgang av hvordan du _kan_ løse oppgaven.

</details>

# Oppsett
Du kan enten velge å kode i CodeSandbox eller klone repoet og kode lokalt:

### Codesandbox
*Link til codesandbox her*

### Lokalt
1. Åpne en terminal og kjør kommandoen 
`git clone git@github.com:bekk/react-animation-workshop.git`

2. Naviger til repo-mappen og kjør `npm install` etterfulgt av `npm run start` og appen vil kjøre på `localhost:1234` i nettleseren.

# Oppgaver
Som du kanskje nå ser har vi laget et enkelt kortspill som vil være utgangspunktet for alt du skal gjøre i denne workshopen, nemlig **krig**! Hvis du ikke husker reglene kan du spørre en av de som holder workshopen, men det spiller ikke så stor rolle, fordi vi har implementert all spillmekanikken for deg. Det du skal fokusere på er all **animasjonen** som man kan tenke seg hører til et slikt spill.

💡Det er mye spillogikk implementert her og der i appen, og selv om vi har prøvd å skjule så mye vi kan vil du fortsatt måtte forholde deg til filer og komponenter som inneholder en del logikk. Vi skal derimot prøve å guide dere til de riktige stedene i appen der oppgavene skal løses.

## Oppgave 1: Drag
I denne oppgaven skal du klare å dra et kort fra en bunke til området der det står *Dra kortet hit*.

🏆Gjør det mulig å klikke på et kort og dra det rundt

💡Gå til `components/Card/Card.jsx` og endre komponenten til å returnere en `<motion.div />` istedenfor.

<details>
  <summary>🚨Løsningsforslag</summary>

```js
  <motion.div 
    className={classNames('Card__wrapper', state, player)}
    drag
  >
    
```

</details>

🏆Legg på constrains slik at kortet ikke flyter avgårde, men stopper når det lander på "Dra kort hit"

💡`<motion.div>` har følgende relevante props: `dragConstraints`, `dragElastic` og `onDragEnd`. Sett sistnevnte til: 

```js
onDragEnd={(event) => {
    if (intersectsPlayArea(event)) {
        dispatch({ type: Action.PLAY });
    }
}}
```

Denne sjekker om kortet befinner seg innenfor det skraverte området når det slippes, og vil endre staten til spillet samt flippe kortet når dette skjer.

<details>
  <summary>🚨Løsningsforslag</summary>
  Trikset for å få det her til å fungere i spillet er å sette constraints'ene til 0 i alle retninger. Framer sin `drag` har en elastisitet man kan styre med `dragElastic`-prop'en, som gjør at man kan få dratt kortet til riktig plassering selv om det ikke får lov til å "lande" noe annet sted enn der det startet.

```js
  <motion.div 
    className={classNames('Card__wrapper', state, player)}
    drag
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
    
```

</details>

### c)

🏆Drag skal kun være mulig hvis kortet er vendt ned. Fiks dette

💡Man kan ha betinget drag slik: `drag={true}`

💡`Card`-komponenten har en `state: CardState`

<details>
  <summary>🚨Løsningsforslag</summary>

```js
  <motion.div 
    className={classNames('Card__wrapper', state, player)}
    drag={state === CardState.CLOSED}
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
    
```

</details>

## Oppgave 2: Animate
`animate`-prop'en lar deg spesifisere et objekt av en rekke verdier, og når noen av disse endres vil motion-komponenten automatisk animeres med/til de nye verdiene. Eksempler er `scale` og `rotation`, eller mer relevant i dette tilfellet: posisjon i form av `x` og `y`. [Her er det bare å leke seg!](https://www.framer.com/api/motion/animation/) For å komme videre med spillet derimot, gjør følgende:

🏆Sørg for at kortene flyttes til riktig posisjon når kortet dras til det skraverte området

💡`Card`-komponenten har en `position`-prop som endres ved visse hendelser i spillet.

❗Si noe om style-propen (i løsningsforslaget?)❗

<details>
  <summary>🚨Løsningsforslag</summary>
  
  Her er all logikk implementert allerede, så dette innebærer bare å legge på en `animate`-prop på `<motion.div>`-en og spread'e `position`-objektet, som oppdateres med riktig posisjoner avhengig av hva som skjer i spillet.
  
  Her har vi også forøvrig lagt på en `rotate`-verdi i `animate`-prop'en for å få kortene til å se litt mer troverdige ut når de ligger i de forskjellige bunkene. Ganske effektfullt (og ikke minst enkelt, bare med en enkelt prop)!
  
```js
  <motion.div 
    className={classNames('Card__wrapper', state, player)}
    drag={state === CardState.CLOSED}
    dragElastic={1}
    animate={{
        rotate: rotation,
        ...position
    }}
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
```

</details>

## Oppgave 3: KRIG!

🏆
💡`CardState: KRIG_OPEN`

<details>
  <summary>🚨Løsningsforslag</summary>
  
  Dette er et løsningsforslag. Eksempelkode følger under
  
```js
  const Komponent = props => {
    return (
      <motion.div

      />
    )
  }
```

</details>

## Oppgave 3: Meny med bl a reset-knapp hvor kortene stokkes og flyr til riktig bunke? Ev. vinneranimasjon

🏆
💡

<details>
  <summary>🚨Løsningsforslag</summary>
  
  Dette er et løsningsforslag. Eksempelkode følger under
  
```js
  const Komponent = props => {
    return (
      <motion.div

      />
    )
  }
```

</details>
