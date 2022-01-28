import React from 'react';

import './Button.css';

const Button = ({value, onClick}) => (
    <button
        className='homeBtn'
        onClick={(event) => onClick(event)}>
        {value}
    </button>
);


export default Button;