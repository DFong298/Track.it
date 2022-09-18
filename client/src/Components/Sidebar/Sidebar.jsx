import React from 'react';
import './Sidebar.css';
import { SidebarInfo } from './SidebarInfo';
import { Link } from "react-router-dom"
import logoIcon from '../../Assets/logoIcon.svg';

const Sidebar = () => {
    return(
        <div className='side-bar'>
            <img
                alt='logo icon'
                className='logo-icon'
                src={logoIcon}
            />
            <ul className='side-bar-list'>
                {SidebarInfo.map((val, key) => {
                    return (
                    <Link to={`${val.linkTo}`} style={{ textDecoration: 'none' }}>
                        <li key={key} 
                            className='row'
                            > 
                            <div>{val.icon}</div>
                        </li>
                    </Link>
                    )
                })}
            </ul>
        </div>
    )
}

export default Sidebar