import React, { Component } from 'react';
// import {loadMovies} from '../../lib/movieService'

class Movie extends Component {
  
  constructor(){
    super();
    this.state = {
      currentMovie: 'heat',
      name: 'test',
      movie: {}
    }
  }

  componentWillReceiveProps(nextProps){
    this.fetchMovie(nextProps.params.movieTitle);
  }

  fetchMovie(movieTitle) {
    fetch(`http://www.omdbapi.com/?i=${movieTitle}`)
    .then(res => res.json())
    .then((data)=>{
      return data
    }).then(
      movie => {
        this.setState({movie})
      }
    )
  }


   componentWillMount(){
    // Called the first time the component is loaded right before the component is added to the page
    // console.log(this.state.currentMovie)

    fetch(`http://www.omdbapi.com/?i=${this.props.params.movieTitle}`)
    .then(res => res.json())
    .then((data)=>{
      return data
    }).then(
      movie => {
        this.setState({movie})
      }
    )
  }
  
  render() {
    
    console.log(`this is ${this.state.movie.Actors}`)
    return (
      <div className="Movie row">
        {/*<h1>Movie: {this.state.movie.Title}</h1>*/}
        <div className="movie-poster col-md-4">
          <img className="movie-poster" src={this.state.movie.Poster} alt={this.state.movie.Title}
          />
        </div>
        <div className="movie-info col-md-8">
          <div className="title">
            {this.state.movie.Title}
          </div>
          <div className="year">
            {this.state.movie.Year}
          </div>
        </div>         
      </div>
    );
  }
}

export default Movie;
