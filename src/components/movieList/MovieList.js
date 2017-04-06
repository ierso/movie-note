import  React from 'react';
import { Link } from 'react-router';

export const MovieList = (props) => {

    if (props.searchValue.length <= 0){
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
            <h1 onClick={props.newPage}>Movies Info</h1>
                {props.movies.map((movie) =>{
                    return(
                        <div className="movie-module" key={movie.id}>
                            <img className="movie-poster" src={
                                (`http://image.tmdb.org/t/p/w185${movie.poster_path}` === 'N/A')
                                ? `http://image.tmdb.org/t/p/w185${movie.poster_path}`
                                : `http://image.tmdb.org/t/p/w185${movie.poster_path}`
                                } alt={movie.title}/>
                            <h5>
                                <Link onClick={props.hideMenu} to={`/movie/${movie.id}`}>
                                    {movie.title}
                                </Link>
                            </h5> 
                        </div>
                    )
                })}
        </div>
    )
}


// MovieList.propTypes = {
//  movies: React.PropTypes.array.isRequired
// }