import React, { Component } from 'react';
import {addMovie, findId} from '../../lib/watchListHelpers'
// import {loadMovies} from '../../lib/movieService'

// import firebase from 'firebase';

class Movie extends Component {
  
  constructor(props){
    super();
    this.state = {
      movie: {}
    }
  }

  componentWillReceiveProps(nextProps){
    this.fetchMovie(nextProps.params.movieTitle);
  }
  
  fetchMovie(movieTitle) {
    fetch(`https://api.themoviedb.org/3/movie/${movieTitle}?api_key=c2d6b648cfb303b5ae02208a5c91d208&query`)
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

    fetch(`https://api.themoviedb.org/3/movie/${this.props.params.movieTitle}?api_key=c2d6b648cfb303b5ae02208a5c91d208&query`)
    .then(res => res.json())
    .then((data)=>{
      return data
    }).then(
      movie => {
        this.setState({movie})
      }
    )
  }

  watchLater = (e) => {
    e.preventDefault()
    
    // const watchList = this.props.watchList;
    const newMovie = {id: this.state.movie.id, title: this.state.movie.title, remove: false};
    
    const updatedWatchList = addMovie(this.props.watchList, newMovie)
    
    this.props.addToWatchList(updatedWatchList);
  
    
    // console.log(this.props.watchList)
  }

  addMovie = () => {
    
    console.log();
   
    // const newMovie = this.state.movie
    // const watchList = this.props.watchList;
    // console.log(watchList)
    // const updatedWatchList = addMovie(this.props.watchList, newMovie)
   
    
  }
  
  
  render() {
  
    return (
      <div className="Movie row">
        <div className="movie-poster col-md-4">
          {/*{this.state.watchList.map((movie)=>{
            return(
              <li>{movie.title}</li>
            )
          })}*/}
          <img className="movie-poster" src={'http://image.tmdb.org/t/p/w185'+this.state.movie.poster_path} alt={this.state.movie.original_title}
          />
        </div>
        <div className="movie-info col-md-8">
          <div className="title">
            <h1>{this.state.movie.original_title} <span>{this.state.movie.imdbRating}</span></h1>
          </div>
          <div className="year">
            <h4><span>Release Date:</span> {this.state.movie.release_date}</h4>
          </div>
          <div className="runtime">
            <h4><span>Runtime:</span> {this.state.movie.runtime} minutes</h4>
          </div>
          <div className="director">
            <h4><span>Directed By:</span> {this.state.movie.Director}</h4>
          </div>
           <div className="written">
            <h4><span>Written By:</span> {this.state.movie.Writer}</h4>
          </div>
          <div className="genre">
            {/*<h4><span>Genre:</span> add later</h4>*/}
          </div>
          <div className="plot">
            <h4>{this.state.movie.overview}</h4>
          </div>

          <button onClick={this.watchLater} className="button">Watch Later</button>

        </div>         
      </div>
    );
  }
}

export default Movie;
