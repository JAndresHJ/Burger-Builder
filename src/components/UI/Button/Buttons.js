import React from 'react';
import classes from './Buttons.module.css';

const button = (props) => (  
    <button 
        onClick={props.clicked}
        className={[classes.Button, classes[props.btnType]].join(' ')}>
        {props.children}
    </button>
)

export default button