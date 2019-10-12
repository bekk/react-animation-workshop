import React, {useState} from 'react';
import './Menu.less';
import { motion } from 'framer-motion';
import {menuitems} from './menuitems'

export const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="Menu">
            <MenuArea />
            <MenuButton onClick={setIsOpen} clicked={isOpen}/>
        </nav>
    )
}

const MenuArea = () => {
    return (
        <div className="MenuArea">
            <MenuNavigation/>
        </div>
    )
}

const MenuNavigation = () => {
    return (
        <ul className="MenuNavigation">
            {menuitems.map(x => {
                return(
                    <li key={x.id}>
                        <a href={x.url}>{x.name}</a>
                    </li>
                )
            })}
        </ul>
    )
}

const MenuButton = ({
    onClick,
    clicked
}) => {
    return (
        <button className="MenuButton" onClick={() => onClick(!clicked)}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </button>
    )
}