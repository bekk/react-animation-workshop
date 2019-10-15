import React, {useState} from 'react';
import './Menu.less';
import { motion } from 'framer-motion';
import {menuitems} from './menuitems'

export const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav className="Menu" initial="closed" animate={isOpen ? "open" : "closed"}>
            <MenuArea />
            <MenuButton onClick={setIsOpen} clicked={isOpen}/>
        </motion.nav>
    )
}

const MenuArea = () => {
    const variants_menuArea = {
        open: {
            opacity: 1,
            x: 0,
        },
        closed: {
            opacity: 0,
            x: -200,
            transition: {
                delay: 0.5
            }
        }
    };

    return (
        <motion.div className="MenuArea" variants={variants_menuArea}>
            <MenuNavigation/>
        </motion.div>
    )
}

const MenuNavigation = () => {
    const variants_navList = {
        open: {
          transition: { staggerChildren: 0.07, delayChildren: 0.2 }
        },
        closed: {
          transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    };

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

    return (
        <motion.ul className="MenuNavigation" variants={variants_navList}>
            {menuitems.map(x => {
                return(
                    <motion.li whileHover={{ scale: 1.5, translateX: 50 }} variants={variants_navItems} key={x.id}>
                        <a href={x.url}>{x.name}</a>
                    </motion.li>
                )
            })}
        </motion.ul>
    )
}

const MenuButton = ({
    onClick,
    clicked
}) => {
    return (
        <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 1.2}} className="MenuButton" onClick={() => onClick(!clicked)}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </motion.button>
    )
}