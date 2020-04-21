import React from 'react';
import '../SnakeGame/gameStyle.css';

export default (props) => {

    const style = {
        left: `${props.part[0]}%`,
        top: `${props.part[1]}%`
    }

    return (
        <div className="food" style={style}></div>
    )
}