# react-animation-workshop
Animasjonsworkshop for React-faggruppen 2019!

# Introduksjon (Bendik oversetter)
Velkommen til animasjonsworkshop! I denne workshopen skal du få leke deg med et relativt nytt animasjonsrammeverk: **Framer Motion**! Versjon 1 av Framer Motion ble lansert i juni i år, og er etterfølgeren til *Pose*, for de som er kjent med det. For en kort intro til Framer Motion kan du lese [denne artikkelen](https://medium.com/better-programming/smooth-animations-with-react-and-framer-motion-c272b6f22f67).

Selve dokumentasjonen til Framer Motion API'et [finner du her](https://www.framer.com/api/motion/?source=post_page-----c272b6f22f67----------------------), hvor du blant annet finner enkle eksempler til de mest grunnleggende funksjonene og mulighetene API'et gir.

Tips: Under "Examples" i dokumentasjonen vi har linket til, scroll helt ned til "More", så finner du lenker til fungerende kodeeksempler i CodeSandbox!

Lest introduskjonsartikkelen? Da får det være nok introduksjon, så la oss bare komme i gang!

## Emoji-guide (Bendik oversetter)

Du kommer til å se noen emojis i oppgavene. De betyr ca det her:

🏆Oppgave: Her er hva du skal gjøre

💡Tips: Litt ekstra info som kan være greit å være for å løse en oppgave

<details>
  <summary>🚨Løsningsforslag: Klikk meg! 😊</summary>

Her finner du en komplett gjennomgang av hvordan du _kan_ løse oppgaven.

</details>

# Oppsett (Bendik oversetter)
1. Klon repoet: 
`git clone git@github.com:bekk/react-animation-workshop.git`

2. Sjekk ut branchen `master_workshop_edition`

3. Naviger til repo-mappen og kjør `npm install` etterfulgt av `npm run start` og appen vil kjøre på `localhost:1234` i nettleseren.

# Oppgaver (Bendik oversetter)
Som du kanskje nå ser har vi laget et enkelt kortspill som vil være utgangspunktet for alt du skal gjøre i denne workshopen, nemlig **krig**! Hvis du ikke husker reglene kan du spørre en av de som holder workshopen, men det spiller ikke så stor rolle, fordi vi har implementert all spillmekanikken for deg. Det du skal fokusere på er all **animasjonen** som man kan tenke seg hører til et slikt spill.

💡Det er mye spillogikk implementert her og der i appen, og selv om vi har prøvd å skjule så mye vi kan vil du fortsatt måtte forholde deg til filer og komponenter som inneholder en del logikk. Vi skal derimot prøve å guide dere til de riktige stedene i appen der oppgavene skal løses.

💡Noen ganger kan det kanskje være vanskelig å vite hvor man skal begynne for å løse en oppgave - en rask titt på løsningsforslaget kan isåfall være lurt.

💡Det er lov å leke seg med api'et, selv om du har løst akkurat det oppgaven ber deg om! Faktisk oppfordrer vi til det, da mange sannsynligvis vil kunne bli ferdig på godt under 2 timer hvis man bare gønner gjennom 😇

## Oppgave 1: Drag (Bendik oversetter)
I denne oppgaven skal du klare å dra et kort fra en bunke til området der det står *Dra kortet hit*.

La oss bryte ned oppgaven:
#### Oppgave 1a)
🏆Vi begynner med det første steget: gjør det mulig å klikke på et kort og dra det rundt, uten noen regler om hvor det skal lande.

💡Gå til `components/Card/Card.jsx` og endre komponenten til å returnere en `<motion.div />` istedenfor en vanlig div.

<details>
  <summary>🚨Løsningsforslag</summary>

```js
  <motion.div
    ...
    drag
  >
    
```

</details>
<br/>

#### Oppgave 1b)

🏆Legg på constraints slik at kortet ikke flyter avgårde. Ikke tenk på at det skal komme til riktig posisjon enda, dette kommer senere.

💡`<motion.div>` har følgende relevante props: `dragConstraints`, `dragElastic` og `onDragEnd`.

Vi har som sagt laget logikken, så dere skal få lov til å kose dere med animasjonen, så sett sistnevnte til:

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
    ...
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
<br/>

#### Oppgave 1c)

🏆Drag skal kun være mulig hvis kortet er vendt ned. Fiks dette

💡Man kan ha betinget drag slik: `drag={true}`

💡`Card`-komponenten har en `state: CardState`

<details>
  <summary>🚨Løsningsforslag</summary>

```js
  <motion.div
    ...
    drag={state === CardState.CLOSED}
    ...
  >
    
```

</details>
<br/>


## Exercise 2: Animate
Let's continue animating!
The `animate` prop takes an object with values that tell the motion component how to animate itself. Whenever any of these values change, the motion component will smoothly animate itself accordingly. [Check out the official docs](https://www.framer.com/api/motion/animation/) for a complete overview of what `animate` can do. Examples of fields you can specify in the `animate` object are `rotation` and `scale`. For now you should probably focus on two fields you can use to position the component: `x` and `y`.

🏆Make the cards move to the right position when they're dragged to the shaded area.

💡The `Card` component has a state variable, `position`, that updates for certain events in the course of the game. Use this to update the motion component.

<details>
  <summary>🚨Solution</summary>
  All the game logic has already been implemented, which makes this exercise pretty straightforward. Simply assign the `position` variable to the motion components' `animate` prop. Here we've also assigned a rotation to the `animate` object for added realism, but this is optional.

```js
  <motion.div
    ...
    animate={{
        rotate: rotation,
        ...position
    }}
>
    <motion.div className={classNames('Card', isOpen ? 'open' : 'closed', suit)}>
        {isOpen && <CardFace value={value} />}
    </motion.div>
</motion.div>
```

</details>
<br/>

## Exercise 3: Add an animated menu
Every game needs a menu screen, and since this workshop is all about animations our menu is of course going to be an animated menu. We have prepared a simple menu component you can use which you'll find in `/components/Menu/Menu.jsx`. Before you start you need to add it to the app by rendering it at the top of the `App` component:

```js
  <div className="App">
      <div className="MenuContainer">
          <Menu />
      </div>
    <div className="Table">
      .
      .
      .
```

As you can see the menu is quite static at the moment, but we'll fix this in a moment.

#### Exercise 3a) (Stephen oversetter)

🏆Add a simple animation when the user clicks or hovers over the menu button. You should look in `Menu.jsx` for this exercise. 

💡You'll find a list of available props to pass to the motion component here: https://www.framer.com/api/motion/component/. Take a closer look at `whileHover` and `whileTap`

<details>
  <summary>🚨Løsningsforslag</summary>
  
  Easy enough: Convert the  `button` elements to `motion.button` and pass the `whileHover` and `whileTap` props. 
  
```js
  const MenuButton = ({
    onClick,
    clicked
}) => {
    return (
        <motion.button
            ...
            whileHover={{scale: 1.1}}
            whileTap={{scale: 1.2}}
        >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </motion.button>
    )
}
```

</details>
<br/>

#### Oppgave 3b) (Stephen oversetter)

🏆Gjør noe tilsvarende med hvert menyelement

<details>
  <summary>🚨Løsningsforslag</summary>
  
```js
  <motion.li whileHover={{ scale: 1.5, translateX: 50 }} key={x.id}>
      <a href={x.url}>{x.name}</a>
  </motion.li>
```

</details>
<br/>

#### Oppgave 3c) (Stephen oversetter)

🏆Bruk "visuell state" med `variants` til å vise/skjule menyen når det klikkes på meny-ikonet.

💡Les om `variants` her: https://www.framer.com/api/motion/animation/#variants. "Visuell state" kan settes i `animate`-propen til et element, og hvis elementet (eller barn-elementer) tar inn en `variants`-prop'en med et objekt som definerer ulike "views" for hver av statene vil det kunne animeres forskjellig basert på den visuelle staten.
💡Se i `Menu` og `MenuArea` komponenten

<details>
  <summary>🚨Løsningsforslag</summary>
  
  Først må vi endre `nav`-elementet til en `motion.nav` og sette "den visuelle staten" (*visual state* som doc'en kaller det) til `motion.nav`-elementet til enten `"open"` eller `"closed"` avhengig av om knappen er klikket eller ikke. Gjør vi det kan vi lage og sette `variants` i underelementene til `motion.nav`-elementet som inneholder disse to statene, som da kan rendres/animeres ulikt avhengig av den visuelle staten.
  
  ```js
  export const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav className="Menu" initial="closed" animate={isOpen ? "open" : "closed"}>
            <MenuArea />
            <MenuButton onClick={setIsOpen} clicked={isOpen}/>
        </motion.nav>
    )
  }
  ```

Det er `MenuArea` vi vil at skal vises/skjules, og dette kan vi da gjøre hvis vi endrer den til å rendre en `motion.div` som tar inn en `variants`-prop med et objekt, `variants_menuArea` hvor vi har definert ulik animasjon for de to visuelle statene, `"open"´og `"closed"`:

  ```js
  const MenuArea = () => {
      const variants_menuArea = {
          open: {
              opacity: 1,
              x: 0,
          },
          closed: {
              opacity: 0,
              x: -200,
          }
      };

      return (
          <motion.div className="MenuArea" variants={variants_menuArea}>
              <MenuNavigation/>
          </motion.div>
      )
  }
  ```

Her har vi satt menyen til å fly inn og ut langs x-aksen, men her er det egentlig bare å leke seg!

  <details>
    <summary>💡Vis/skjul menyen like a pro</summary>

    En kul effekt er å bruke `clipPath` som en variant for å skjule/vise menyen. Endre `variants_menuArea` til følgende:

  ```js
  const variants_menuArea = {
        open: {
            clipPath: `circle(500px at 40px 40px)`,
            transition: {
                type: "spring",
                stiffness: 50,
            }
        },
        closed: {
            clipPath: "circle(30px at 40px 40px)",
            transition: {
                type: "spring",
                stiffness: 50,
            }
        }
    };
  ```

  </details>

</details>
<br/>

#### Oppgave 3d) (Stephen oversetter)

Nå skal vi legge på animasjoner på selve innholdet i menyen.

🏆Få listen i menyen til å fly inn og ut fra toppen når menyen åpnes/lukkes.

💡Husk at barn av elementer som har en visuell state også kan bruke `variants` til å rendres/animeres avhengig av staten.
💡Sett på en liten delay på kortet når det lukkes slik at innholdet rekker å animeres ferdig før menyen forsvinner.
💡Se `MenuNavigation`

<details>
  <summary>🚨Løsningsforslag</summary>
  
  Definer en `variants_menuList` i `MenuNavigation`: 
  
  ```js
  const variants_navItems = {
      open: {
          opacity: 1,
          y: 0
      }, 
      closed: {
          opacity: 0,
          y: -50
      }
  }
  ```
  
  Og legg den til på `motion.li`-elementene:

  ```js
  <motion.li variants={variants_navItems} key={x.id}>
      <a href={x.url}>{x.name}</a>
  </motion.li>
  ```
  
  For å få delay når kortet skjules, legg til følgende i `closed`-objektet til `variants_menuArea`:
  
  ```js
  transition: {
      delay: 0.5
  }
  ```

</details>
<br/>

#### Oppgave 3e) (Stephen oversetter)

Vi kan la et forelder-element styre når animasjonene til barn-elementene blir satt i gang ved hjelp av `transition`-props som blant annet `staggerChildren`. For eksempel `staggerChildren: 1` vil utsette utførelsen av animasjonen til hvert barn-element med 1 sekund.

Dette kan vi bruke på liste-elementene i menyen vår!

🏆Bruk `staggerChildren` til å få hvert listeelement i menyen til å fly inn hver for seg.

💡`variants`-eksempelet i Framer-dokumentasjonen inneholder en meny som tilfeldigvis ligner litt på vår, hvor det brukes `staggerChildren`...

<details>
  <summary>🚨Løsningsforslag</summary>
  
  Vi må definere et `variants`-objekt til `motion.ul`-elementet hvor vi setter `staggerChildren`. Det kan være fint å sette på en `delayChildren` når vi åpner menyen også, slik at menyelementene ikke skal komme før kortet vises helt. `delayChildren` vil utsette animasjonen til samtlige barn-elementer.
  
  ```js
  const variants_navList = {
      open: {
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
      },
      closed: {
        transition: { staggerChildren: 0.05}
      }
  };
  ```
  
  Og legg den til på `motion.ul`-elementet:

  ```js
  <motion.ul className="MenuNavigation" variants={variants_navList}>
  ```

</details>
<br/>

## Oppgave 4: Animere poengsummer (Stephen oversetter)

Siste oppgave blir å legge på animasjon på en feature som viser poengsummene til spillerne. Her er det mange muligheter, så dette blir en åpen oppgave, men aller først: Rendre `<Score>`-komponenten i `App`, for eksempel rett etter menyen:

```js
<div className="MenuContainer">
    <Menu />
</div>
<div className="ScoreContainer">
    <Score playerScore={state.score.player} computerScore={state.score.computer}/>
</div>
```

🏆Bruk det du har lært til nå (eller bruk og lær noe helt nytt!) til å legge på animasjon på tallene hver gang poengsummen oppdateres.

💡Et par relativt simple muligheter:
* Legge på rotasjon
* Skalere tallene iht. størrelsesforholdet på poengsummene

## Ferdig før tiden? (Stephen oversetter)

Da har vi et par forslag til hva du kan gjøre nå:

🏆Gjør det mulig å kunne rearrangere elementene i menyen med drag and drop

💡Det finnes et [eksempel i Framer-dokumentasjonen](https://codesandbox.io/s/framer-motion-drag-to-reorder-pkm1k) hvor akkurat dette gjøres

<br/>

🏆Gjør om menyelementene til "Accordions" med noe random innhold

💡[Accordion-eksempel i Framer docs'ene](https://codesandbox.io/s/framer-motion-accordion-qx958)

<br/>

🏆Vis en modal når man klikker på "Regler" i menyen som inneholder en lang og scrollbar tekst

💡[Scroll-eksempel i Framer docs'ene](https://codesandbox.io/s/framer-motion-viewport-scroll-and-svg-path-animation-mwi35?fontsize=14&module=%2Fsrc%2FExample.tsx)
