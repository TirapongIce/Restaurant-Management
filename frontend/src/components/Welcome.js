import React from 'react';
import { Typography } from 'antd';
import './Welcome.css'; 
import WelcomeImage from '../assets/Welcome.jpg'; 

const { Title } = Typography;

const Welcome = () => {
    return (
        <div className="welcome-container" style={{ backgroundImage: `url(${WelcomeImage})` }}>
            <div className="welcome-content">
                <Title level={2} className="welcome-title">Welcome To Restaurant </Title>
            </div>
        </div>
    );
};

export default Welcome;
