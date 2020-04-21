import React from 'react';

export default (props) => {
    return (
        <div>
            {props.snakeParts.map((part, i) => {
                const style = {
                    left: `${part[0]}%`,
                    top: `${part[1]}%`
                }
                return (
                    <div className="snake_part" key={i} style={style}></div>
                )
            })}
        </div>
    );
};

