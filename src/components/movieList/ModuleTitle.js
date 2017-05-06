import  React from 'react'

import './css/ModuleTitle.css'

export const ModuleTitle = (props) => {
    
    return (
        <div className="module-title">
            <h4>{props.movieTitle}</h4>   
        </div>
    )
}