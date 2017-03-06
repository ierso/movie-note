import  React from 'react'

export const MovieList = (props) => {
    return (
        <div className="Movie-List">
            <h1>Movies Info</h1>
            
                {props.movies.map((movie) =>{
                    return(
                        
                        <div className="movie-module" key={movie.imdbID}>
                            <h2><a href="">{movie.Title}</a></h2>
                            <img className="movie-poster" src={
                                (movie.Poster === 'N/A')
                                ? props.poster
                                : movie.Poster
                                } alt={movie.Title}/>
                        </div>
                    )
                })}
            
        </div>
    )
}


