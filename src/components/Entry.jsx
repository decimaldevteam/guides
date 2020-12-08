import React from 'react';

export default function Entry({ name }){
    let x = name.toLowerCase();

    return <div className="entry-box">
        <h3>{name}:</h3>
        <input
            type="text"
            id={`${x}-entry`}
            placeholder={`Your guide ${x} here...`}
        />
    </div>
};