import * as React from 'react';
import * as Styles from './index.css';
import {NavLink} from 'react-router-dom';

export function Nav(){
    return(
        <ul className={Styles.nav}>
            <li>
                <NavLink exact activeClassName={Styles.active} to='/'>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink  activeClassName={Styles.active} to='/battle'>
                    Battle
                </NavLink>
            </li>
            <li>
                <NavLink  activeClassName={Styles.active} to='/popular'>
                    Popular
                </NavLink>
            </li>
        </ul>
    )
}