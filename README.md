# react-animation-workshop
A workshop about making animations in React apps. 

For Booster Conference 2020.

# Introduction
Welcome! In this workshop you'll get to play with a relatively new framework for making animations in React: **Framer Motion!** V1 of Framer Motion was released in June last year and is the successor to *Pose*, for those who are familiar with that. Read [this article](https://medium.com/better-programming/smooth-animations-with-react-and-framer-motion-c272b6f22f67) for a brief intro to Framer Motion.

The official documentation for the Framer Motion API [can be found here](https://www.framer.com/api/motion/?source=post_page-----c272b6f22f67----------------------), where you'll find simple examples of the most basic functions and possibilities that the API provides, among other things.

Tip: Scroll down to the "More" section, located under "Examples" in the documentation, and you'll find links to working code examples in CodeSandbox!

Done reading the introductory article? Then you are ready to move on to the exercises!

## Emoji-guide

You will see some emojis in the exercise descriptions. They mean the following:

🏆Task: This is what you are supposed to do

💡Tip: Some extra info that might be good to know for solving the relevant exercise. 

<details>
  <summary>🚨Solution: Click me! 😊</summary>

Here is a full proposal of how you *may* solve the exercise.

</details>

# Setup [TODO: Endre branch-navn]
1. Clone the repository: 
`git clone git@github.com:bekk/react-animation-workshop.git`

2. Check out the branch `master_workshop_edition`

3. Navigate to the repository folder and run `npm install` followed by `npm run start` and the app will run on `localhost:1234` in your browser.

# Exercises
We've made a simple card game that will be the starting point for everything you'll do in this workshop. The cardgame is called **war** ("Krig" in Norwegian). Just ask any of us if you don't know or remember the rules, but it doesn't really matter, because we've implemented all the game mechanics for you. What you should focus on is the possible **animations** that may suit such a game.

💡There is a lot of game logic implemented here and there in the app, and although we have tried to hide as much as we possible, you'll still have to deal with files and components that contain some logic. However, we will try to guide you to the right places in the app where the tasks is supposed to be solved.

💡Sometimes it may be difficult to know where to begin in order to solve an exercise - a quick look at the solution proposal may be wise (and allowed) in this case.

💡You are allowed to continue to play with the API, even after you've done exactly what the exercise asks you to do. In fact, we encourage it! You'll probably learn a lot just trying out different things on your own.

## Exercise 1: Drag 💃
After doing this exercise you should be able to pull a card from one of the card stacks to the area that says *Drag the card here*.

Let's break it down:

#### Exercise 1a)
🏆We start with the first step: Make it possible to click on a card and drag it around (without any rules of where it should land).

💡Navigate to `components/Card/Card.jsx` and change the component such that it returns a `<motion.div />` instead of a regular `<div>`

<details>
  <summary>🚨Solution</summary>

```js
  <motion.div
    ...
    drag
  >
    
```

</details>
<br/>

#### Exercise 1b)

🏆Add some constraints such that the card doesn't just float away. Don't think avbout getting it to the right position yes, this comes later.

💡`<motion.div>` has the relevant props: `dragConstraints`, `dragElastic` and `onDragEnd`.

As mentioned, we've made the game logic so that you may focus on making the animations. Therefore, just add the following:

```js
onDragEnd={(event) => {
    if (intersectsPlayArea(event)) {
        dispatch({ type: Action.PLAY });
    }
}}
```

This will change the state of the game and flip the card when it is dragged and dropped within the shaded area.

<details>
  <summary>🚨Solution</summary>
  The trick to make this work is to set the constraints to 0 in all directions. Framer's `drag` has an elasticity that can be controlled with the `dragElastic` props, which allows the card to be pulled to the correct position even if it is not allowed to "land" anywhere other than where it started.

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

#### Exercise 1c)

🏆Dragging should only be allowed if the card is flipped down. Make it so.

💡You can implement conditional drag like this: `drag={true}`

💡The `Card`-component has a `state: CardState`

<details>
  <summary>🚨Solution</summary>

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

🏆Make the cards move to the right position when they're dragged to the "drag card here"-area.

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
  <summary>🚨Solution</summary>
  
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

Det er `MenuArea` vi vil at skal vises/skjules, og dette kan vi da gjøre hvis vi endrer den til å rendre en `motion.div` som tar inn en `variants`-prop med et objekt, `variants_menuArea` hvor vi har definert ulik animasjon for de to visuelle statene, `"open"`og `"closed"`.

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

TODO (fra Bendik): Kan også sette `staggerChildren` rett på `variants_menuArea`, da fungerer det og man slipper å måtte legge til `variants` på `motion.ul`-elementet (siden det propageres nedvover til barnekomponenter). Vurdere å endre lf'et.
  
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

## Exercise 4: Animate the scores

The last exercise will be to add some animation to a feature that displays the scores of the players. This will be an open exercise since it can be done in multiple ways, but first: Render the `<Score`> component in `<App>` (right after the menu, for instance).

```js
<div className="MenuContainer">
    <Menu />
</div>
<div className="ScoreContainer">
    <Score playerScore={state.score.player} computerScore={state.score.computer}/>
</div>
```

🏆Use what you've learned so far (or learn and make use of something completely new!) and add an animation to the scores every time they are updated.

💡A couple of relatively simple suggestions:
* Add rotation
* Scale the numbers according to the difference of the score values

## Finished early?

Then we have a couple of suggestions for what you can do now:

🏆Make it possitlbe to rearrange the elements in the menu with drag and drop

💡Take a look at an [example in the Framer documentation](https://codesandbox.io/s/framer-motion-drag-to-reorder-pkm1k) that does the same

<br/>

🏆Convert the elements in the menu to "Accordions" with some random content

💡[Accordion example in the docs](https://codesandbox.io/s/framer-motion-accordion-qx958)

<br/>

🏆Display a modal when clicking on "Rules" in the menu that contains a long and scrollable text

💡[Scroll example in the docs](https://codesandbox.io/s/framer-motion-viewport-scroll-and-svg-path-animation-mwi35?fontsize=14&module=%2Fsrc%2FExample.tsx)
