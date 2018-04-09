import  React from 'react'
import { Link } from 'react-router';

import './css/Recommendations.css'

export const Recommendations = (props) => {

    if(props.recommendations){
        return (
            <div className="recommendations">
              <h4 className="info-title">Recommendations</h4>
              <hr></hr>
              <div className="movie-rec">
                {
                  props.recommendations.map(function(movie, index){
                    if(index <= 5){
                      return(
                        <div className="movie-single-rec" key={index}>
                          <Link to={`/movie/${movie.id}`}>
                            <div className="movie-rec-poster">
                              {
                                (movie.poster_path === null)
                                ? <div className="blank-profile"></div>
                                : <img className="movie-rec-img" src={
                                `https://image.tmdb.org/t/p/w500_and_h282_face/${movie.poster_path}`
                                }  alt={movie.title}/>
                              }
                            </div>
                            {movie.title}
                          </Link>
                        </div>
                      )
                    } else{
                      return false
                    }
                  })
                }
              </div>
            </div>
        )
    }else{
        return false
    } 
}