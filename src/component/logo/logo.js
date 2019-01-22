import React from 'react';
import ImgUrl from './job.jpg';
import './logo.css';

class Logo extends React.Component{
    render(){
        return (
            <div className="logo-container">
                <img src={ImgUrl} alt=""/>
            </div>
        )
    }
}

export default Logo;