import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import workImg from '../../assets/images/workImg.png';

const Home = () => {
    return (
        <div id='loginPage' className='bg-yellow'>
            <div className='conatiner loginPage vhContainer '>
                <div className='side'>
                    <a href='#'>
                        <img className='logoImg' src={logo} alt='LogoImg' />
                    </a>
                    <img className='d-m-n' src={workImg} alt='workImg' />
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
