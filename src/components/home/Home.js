import React, { Component } from 'react';
import {loadRecentMovies} from '../../lib/movieService'
import { Link } from 'react-router';

import './index.css'


class Home extends Component {
  
  constructor(props) {
    super();
    this.state = {
       recentMovies: []
    }
  }
  
  componentWillMount(){
    this.recentMovies();
  }
  
  recentMovies = () => {
    loadRecentMovies().then(
      recentMovies => {
        this.setState({recentMovies})
      }
    )
  }
  
  render() {
   
    return (
      <div className="recent-movies">
        <div className="recent-movies-list">
          {this.state.recentMovies.map((movie) =>{
            return(
              <div className="recent-movie" key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <img className="recent-movie-poster" src={
                    (`https://image.tmdb.org/t/p/w300${movie.poster_path}` === 'N/A')
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    } alt={movie.title}/>
                </Link>
              </div>
            )
          })}      
        </div>
      </div>
    );
  }
}

export default Home;
