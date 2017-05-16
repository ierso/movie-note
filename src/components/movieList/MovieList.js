import  React from 'react';
import { Link } from 'react-router';
import {ModulePoster} from './ModulePoster'
import {ModuleTitle} from './ModuleTitle'

import './css/index.css'

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
                        <div className="movie-module-wrapper" key={movie.id}>
                            <Link onClick={props.hideMenu} 
                                to={`/movie/${movie.id}`} 
                                className="movie-module" 
                                key={movie.id}>
                            
                                <ModulePoster 
                                moviePoster={movie.poster_path}
                                movieTitle={movie.title}
                                />
                                
                                <ModuleTitle 
                                movieTitle={movie.title}
                                />
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