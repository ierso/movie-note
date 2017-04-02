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
        <div className="movie-poster col-md-4">
          <img className="movie-poster" src={this.state.movie.Poster} alt={this.state.movie.Title}
          />
        </div>
        <div className="movie-info col-md-8">
          <div className="title">
            <h1>{this.state.movie.Title} <span>{this.state.movie.imdbRating}</span></h1>
          </div>
          <div className="year">
            <h4><span>Release Date:</span> {this.state.movie.Year}</h4>
          </div>
          <div className="runtime">
            <h4><span>Runtime:</span> {this.state.movie.Runtime}</h4>
          </div>
          <div className="director">
            <h4><span>Directed By:</span> {this.state.movie.Director}</h4>
          </div>
           <div className="written">
            <h4><span>Written By:</span> {this.state.movie.Writer}</h4>
          </div>
          <div className="genre">
            <h4><span>Genre:</span> {this.state.movie.Genre}</h4>
          </div>
          <div className="plot">
            <h4>{this.state.movie.Plot}</h4>
          </div>

          <button onClick={this.addMovie} className="button">Watch Later</button>

        </div>         
      </div>
    );
  }
}

export default Movie;
