import  React from 'react'

import './css/ModulePoster.css'

export const ModulePoster = (props) => {
    return (
        <div className="module-poster">
            {    
            (props.moviePoster === null)
            ? <div className="module-poster-img-placeholder"></div>
            : <img className="module-poster-img" src={`https://image.tmdb.org/t/p/w185${props.moviePoster}`} alt={props.movieTitle}/>
            } 
        </div>
    )
}