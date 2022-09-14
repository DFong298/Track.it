import React from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx'
import './Homepage.css';
import { Link } from "react-router-dom"
import bannerLogo from '../../Assets/bannerLogo.svg'

const HomePage = () => {
    return (
        <div className='home-page'>
            <Sidebar/>
            <div className='wrapper'>
                <div className='welcome'>Welcome to</div>
                <img
                    alt='banner logo'
                    src={bannerLogo}
                    className='main-banner'
                />
                <Link to='/portfolios' style={{ textDecoration: 'none' }}>
                    <button className='get-started'>Get Started</button>
                </Link>
            </div>
        </div>
    )
}

export default HomePage