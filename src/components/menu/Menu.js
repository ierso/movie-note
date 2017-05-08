import  React from 'react'

import './index.css'

export const Menu = (props) => {

    return (
            <div className={props.menuClass} onClick={props.toggleMenu}>   
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
    )
}

