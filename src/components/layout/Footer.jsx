import React from 'react';
import './FooterStyles.css';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='top'>
                <div>
                    <h1>CRUD app</h1>
                    <p>Part 1</p>
                </div>
            </div>
            <div className='bottom'>&copy; avZ. All rights reserved</div>
        </div>
    );
};

export default Footer;
