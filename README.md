# react-animation-workshop
Animasjonsworkshop for React-faggruppen 2019!

# Introduksjon
Velkommen til animasjonsworkshop! I denne workshopen skal du få leke deg med et relativt nytt animasjonsrammeverk: **Framer Motion**! Versjon 1 av Framer Motion ble lansert i juni i år, og er etterfølgeren til *Pose*, for de som er kjent med det. For en kort intro til Framer Motion kan du lese [denne artikkelen](https://medium.com/better-programming/smooth-animations-with-react-and-framer-motion-c272b6f22f67).

Selve dokumentasjonen til Framer Motion API'et [finner du her](https://www.framer.com/api/motion/?source=post_page-----c272b6f22f67----------------------), hvor du blant annet finner enkle eksempler til de mest grunnleggende funksjonene og mulighetene API'et gir.

Tips: Under "Examples" i dokumentasjonen vi har linket til, scroll helt ned til "More", så finner du lenker til fungerende kodeeksempler i CodeSandbox!

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

💡Noen ganger kan det kanskje være vanskelig å vite hvor man skal begynne for å løse en oppgave - en rask titt på løsningsforslaget kan isåfall være lurt.

💡Det er lov å leke seg med api'et, selv om du har løst akkurat det oppgaven ber deg om! Faktisk oppfordrer vi til det, da mange sannsynligvis vil kunne bli ferdig på godt under 2 timer hvis man bare gønner gjennom 😇

## Oppgave 1: Drag
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

## Oppgave 2: Animate
La oss gå litt videre med animeringen!
`animate`-prop'en lar deg spesifisere et objekt av en rekke verdier, og når noen av disse endres vil motion-komponenten automatisk animeres med/til de nye verdiene. Eksempler er `scale` og `rotation`, eller mer relevant i dette tilfellet: posisjon i form av `x` og `y`. [Her er det bare å leke seg!](https://www.framer.com/api/motion/animation/) For å komme videre med spillet derimot, gjør følgende:

🏆Sørg for at kortene flyttes til riktig posisjon når kortet dras til det skraverte området

💡`Card`-komponenten har en `position`-prop som endres ved visse hendelser i spillet.

<details>
  <summary>🚨Løsningsforslag</summary>
  Her er all logikk implementert allerede, så dette innebærer bare å legge på en `animate`-prop på `<motion.div>`-en og sette den til `position`-objektet, som oppdateres med riktig posisjoner avhengig av hva som skjer i spillet.

  Her har vi også forøvrig lagt på en `rotate`-verdi i `animate`-prop'en for å få kortene til å se litt mer troverdige ut når de ligger i de forskjellige bunkene. Ganske effektfullt (og ikke minst enkelt, bare med en enkelt prop)!
  
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

## Oppgave 3: KRIG! (kanskje ingen oppgave?)

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
<br/>

## Oppgave 4: Legg til meny med animasjon
I denne oppgaven skal du få leke deg med å legge til animasjoner på et menyelement. Vi har laget en enkel meny som du finner i `/components/Menu/Menu.jsx` som du kan rendre øverst i `App`:

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

Som du ser vises menyen foreløpig bare ut som et statisk element, men dette kan vi gjøre noe med.

#### Oppgave 4a)

🏆Gå i `Menu.jsx` og legg på enkel hover- og klikk-effekt på menyknappen (åpne og lukke menyen kommer i en senere oppgave!)

💡Les om hvilke props motion-api'et støtter her: https://www.framer.com/api/motion/component/ og https://www.framer.com/api/motion/examples/

<details>
  <summary>🚨Løsningsforslag</summary>
  
  Enkelt og greit: Gjør om `button`-elementene til `motion.button` og send inn `whileHover`-og `whileTap`-props. 
  
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

#### Oppgave 4b)

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

#### Oppgave 4c)

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

#### Oppgave 4d)

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

#### Oppgave 4e)

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

## Oppgave 5: Animere poengsummene

På tide å gjøre noe med tallene som viser poengsummene! Her er det mange muligheter, så dette blir en åpen oppgave:

🏆Bruk det du har lært til nå (eller bruk og lær noe helt nytt!) til å legge på animasjon på tallene hver gang poengsummen oppdateres.

💡Et par relativt simple muligheter:
* Legge på rotasjon
* Skalere tallene iht. størrelsesforholdet på poengsummene

## Ferdig før tiden?

Da har vi et par forslag til hva du kan gjøre nå:

🏆Gjør det mulig å kunne rearrangere elementene i menyen med drag and drop

💡Det finnes et [eksempel i Framer-dokumentasjonen](https://codesandbox.io/s/framer-motion-drag-to-reorder-pkm1k) hvor akkurat dette gjøres

<br/>

🏆Gjør om menyelementene til "Accordions" med noe random innhold

💡[Accordion-eksempel i Framer docs'ene](https://codesandbox.io/s/framer-motion-accordion-qx958)

<br/>

🏆Vis en modal når man klikker på "Regler" i menyen som inneholder en lang og scrollbar tekst

💡[Scroll-eksempel i Framer docs'ene](https://codesandbox.io/s/framer-motion-viewport-scroll-and-svg-path-animation-mwi35?fontsize=14&module=%2Fsrc%2FExample.tsx)
