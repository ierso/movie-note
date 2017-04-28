import  React from 'react';
import { Link } from 'react-router';

export const MovieList = (props) => {

    if (props.searchValue.length <= 0){
        return null
    }

   
    if(!props.movies){
        return (
            <div className="movie-list">
                <h1>Movies Info</h1>      
                <div className="movie-module">
                    <img className="movie-poster" src={props.poster} alt='Coming Soon'/>
                    <h2><a href="">Loading...</a></h2>
                </div>
            </div>
        )
    }
  
    return (
         
        <div className="movie-list">
            <div className="top-results">
                <p>Top Results</p>
            </div>
                {props.movies.map((movie) =>{
                    return(
                        <div>
                            <Link onClick={props.hideMenu} to={`/movie/${movie.id}`} className="movie-module" key={movie.id}>
                            <div className="module-poster">
                                    {    
                                    (movie.poster_path === null)
                                    ? <div className="module-poster-img-placeholder"></div>
                                    : <img className="module-poster-img" src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title}/>
                                    } 
                            </div>
                            <div className="module-title">
                                <h4>{movie.title}</h4>   
                            </div>
                            </Link> 
                        </div>
                    )
                })}
        </div>
    )
}


// MovieList.propTypes = {
//  movies: React.PropTypes.array.isRequired
// }