import  React from 'react';

export const MovieList = (props) => {

    if (props.showMenu === false){
        console.log("HEELO!!")
        return null
    }

    if(!props.movies){
        return (
            <div className="Movie-List">
                <h1>Movies Info</h1>      
                <div className="movie-module">
                    <img className="movie-poster" src={props.poster} alt='Coming Soon'/>
                    <h2><a href="">Loading...</a></h2>
                </div>
            </div>
        )
    }
    return (
        <div className="Movie-List">
            <h1>Movies Info</h1>
                {props.movies.map((movie) =>{
                    return(
                        
                        <div className="movie-module" key={movie.imdbID}>
                            <img className="movie-poster" src={
                                (movie.Poster === 'N/A')
                                ? props.poster
                                : movie.Poster
                                } alt={movie.Title}/>
                            <h2><a href="">{movie.Title}</a></h2> 
                        </div>
                    )
                })}
        </div>
    )
}


// MovieList.propTypes = {
//  movies: React.PropTypes.array.isRequired
// }