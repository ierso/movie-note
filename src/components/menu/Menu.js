import  React from 'react'

import './Menu.css'

export const Menu = (props) => {
    console.log(props.toggleMenu)
    return (
            <div className="menu" onClick={props.toggleMenu.bind(this)}>   
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
    )
}

