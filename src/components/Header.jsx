/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

window.darkMode = false;
let setStyle = (a, b) => document.documentElement.style.setProperty(a, b);

window.dark = () => {
    if(!window.darkMode){
        window.darkMode = true;

        setStyle('--background-color', '#121212');
        setStyle('--font-color', 'white');
        setStyle('--header-color', '#18181d');
        setStyle('--sidebar-color', '#303030');
        setStyle('--card-color', '#303030');
        setStyle('--dark-color', 'white');
        setStyle('--blockquote-color', '#6a737d');
        setStyle('--paginator-link-color', '#16161d');

        document.querySelector('.header-branding img').src = '/assets/favicon.png';
        
    }else{
        window.darkMode = false;

        setStyle('--background-color', 'white');
        setStyle('--font-color', 'black');
        setStyle('--header-color', 'white');
        setStyle('--sidebar-color', 'white');
        setStyle('--card-color', 'white');
        setStyle('--dark-color', 'black');
        setStyle('--blockquote-color', '#dadde1');
        setStyle('--paginator-link-color', '#dadde1');

        document.querySelector('.header-branding img').src = '/assets/white-favicon.png';
    }
};

export default function(){
    return <>
        <div className="header">
            <div className="header-content">
                <div className="header-branding">
                    <img
                        src="/assets/white-favicon.png"
                        draggable="false"
                        width="65"
                    />
                    <font>Decimal Guides</font>
                </div>

                <a href="/#/">Home</a>
                <a href="/#/guides">Guides</a>
                <a href="/#/history">History</a>

                <label class="switch">
                    <input type="checkbox"/>
                    <span class="slider" onClick={window.dark}></span>
                </label>
            </div>
        </div>

        <div className="dup-header"/>
    </>
};