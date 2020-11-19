/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

export default function({ guide }){
    return <>
        <div className="card-holder card">
            <h3>{guide.name}</h3>
            <p>{guide.description}</p>
            <font className="muted">Last updated at {guide.updated}</font>

            <img
                className="card-img"
                src={guide.thumbnail}
                draggable="false"
            />

            <div className="card-links">
                <a href={'/#/guide/' + guide.file} className="btn" style={{ backgroundColor: 'rgb(255, 234, 74)' }}><i class="fas fa-book"/> Read</a>
            </div>
        </div>
    </>
};