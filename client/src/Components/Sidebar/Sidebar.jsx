import React from 'react';
import './Sidebar.css';
import { SidebarInfo } from './SidebarInfo';
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
                    return <li key={key} 
                    className='row'
                    onClick={() => {window.location.pathname = val.linkTo}}> 
                    <div>{val.icon}</div></li>
                })}
            </ul>
        </div>
    )
}

export default Sidebar