import React, { Component } from 'react';
import {addMovie} from '../../lib/watchListHelpers'
// import {loadMovies} from '../../lib/movieService'

// import firebase from 'firebase';

class Movie extends Component {
  
  constructor(props){
    super();
    this.state = {
      movie: {
        "genres": [{}],
        "production_companies": [{}],
        "production_countries": [{}],
        "spoken_languages": [{}],
        "credits": {
          "cast": [{}],
          "crew": [{}]
        },
        "releases": {
          "countries": [{}]
        },
        "images": {
          "backdrops": [{}],
          "posters": [{}]
        },
        "videos": {
          "results": [{}]
        }
      },
        directors: []
      }
    }

  componentWillReceiveProps(nextProps){
    this.fetchMovie(nextProps.params.movieTitle)
    
  }

  fetchMovie(movieTitle) {
    fetch(`https://api.themoviedb.org/3/movie/${movieTitle}?api_key=c2d6b648cfb303b5ae02208a5c91d208&query&append_to_response=credits,releases,images,videos`)
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

      fetch(`https://api.themoviedb.org/3/movie/${this.props.params.movieTitle}?api_key=c2d6b648cfb303b5ae02208a5c91d208&query&append_to_response=credits,releases,images`)
      .then(res => res.json())
      .then((data)=>{
        return data
      }).then(
        movie => {
          this.setState({movie})
      })
    }

    

  watchLater = (e) => {
    e.preventDefault()
    
    // const watchList = this.props.watchList;
    const newMovie = {id: this.state.movie.id, title: this.state.movie.title, remove: false};
    
    const updatedWatchList = addMovie(this.props.watchList, newMovie)
    
    this.props.addToWatchList(updatedWatchList);
  
  }


  
  render() {

    // console.log(JSON.stringify(this.state.movie))
    var style = {
      backgroundColor: '#eee',
      // backgroundImage: "url('https://image.tmdb.org/t/p/w1400_and_h450_bestv2/kMzU4PkXcKcDMngCxXji0BbVXsu.jpg')",
      // backgroundSize: 'cover'
    }
    
    let directors = [];
    this.state.movie.credits.crew.forEach(function (task) {
        if (task.job === 'Director') {
            directors.push(task.name);
        }
    })

    let writers = [];
    this.state.movie.credits.crew.forEach(function (task) {
        if (task.department === 'Writing') {
            writers.push(task.name);
        }
    })

    return (
      <div className="Movie row" style={style}>
        <div className="movie-poster-wrapper col-md-4">
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
            <h4><span>Directed By:</span> {directors.join(', ')}</h4>
          </div>
           <div className="written">
            <h4><span>Written By:</span> {writers.join(', ')}</h4>
          </div>
          <div className="genre">
            <h4><span>Genre:</span> {
              this.state.movie.genres.map(function(genre){
               return(<li key={genre.id}>{genre.name}</li>)
              })
            }</h4>
          </div>
          <div className="plot">
            <h4>{this.state.movie.overview}</h4>
          </div>

          <button onClick={this.watchLater} className="button">+ Add to Watchlist</button>

          <div className="videos">
            Youtube Videos id
            {/*{this.state.movie.videos.results.map(function(video){
              return(
                <div>
                  {video.key}
                </div>
              )
            })}*/}
          </div>

        </div>         
      </div>
    );
  }
}

export default Movie;
