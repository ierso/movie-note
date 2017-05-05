import  React from 'react'

export const MoviePoster = (props) => {
    
    return (
        <div className="movie-poster">
            {
            (props.poster === undefined)
            ? <div className="movie-poster-blank"></div>
            : <img className="movie-poster-img" 
                src={'http://image.tmdb.org/t/p/w500'+
                props.poster} 
                alt={props.posterTitle}/>
            }
        </div>
    )
}