import React, { Component } from 'react';
import {addMovie, modifyText} from '../../lib/watchListHelpers'

import {MovieTitle} from './MovieTitle'
import {MoviePoster} from './MoviePoster'
import {Rating} from './Rating'
import {Recommendations} from './Recommendations'
import {Directors} from './Directors'
import {Writers} from './Writers'
import {Actors} from './Actors'
import {Genre} from './Genre'
import {Runtime} from './Runtime'

import person from '../../person.svg'

import './css/index.css'

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
        "recommendations":{
          "results": [{}]
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
    fetch(`https://api.themoviedb.org/3/movie/${movieTitle}?api_key=c2d6b648cfb303b5ae02208a5c91d208&query&append_to_response=credits,releases,images,videos,recommendations`)
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

      fetch(`https://api.themoviedb.org/3/movie/${this.props.params.movieTitle}?api_key=c2d6b648cfb303b5ae02208a5c91d208&query&append_to_response=credits,releases,images,recommendations`)
      .then(res => res.json())
      .then((data)=>{
        return data
      })
      .then(
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


  createGroupedArray = (arr, chunkSize) => {
    var groups = [], i;
      for (i = 0; i < arr.length; i += chunkSize) {
          groups.push(arr.slice(i, i + chunkSize));
      }
    return groups;
  }


  render() {

    let newDate = modifyText(`${this.state.movie.release_date}`, '-')

    let imgUrl = `https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}`
    const backdop = {
      backgroundColor: '#eee',
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center 15%',
      filter: 'brightness(120%) grayscale(40%)'
    }

    const blankPerson = {
        backgroundImage: 'url(' + person + ')',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 11px'
    }

    return (
      <div className="movie">

        <div className="movie-header">
          <div className="movie-header-backdrop" style={backdop}></div>
          <div className="movie-header-content">

            <MoviePoster
            poster={this.state.movie.poster_path}
            posterTitle={this.state.movie.original_title}
            />

            <div className="movie-header-info">

              <MovieTitle 
              title={this.state.movie.original_title}
              date={newDate}
              />

              <div className="movie-attributes">

                <Rating
                rating={this.state.movie.releases.countries}
                />

                <Runtime 
                runtime={this.state.movie.runtime}
                />

                <Genre 
                genres={this.state.movie.genres}/>
                
              </div>
              
              <div className="plot">
                <p>{this.state.movie.overview}</p>
              </div>
              
              <div className="movie-rating">
                <h4>{this.state.movie.vote_average} <sup>/ 10</sup></h4>
              </div>
              
              <div className="movie-watchBtn">
                <button onClick={this.watchLater} className="button">+ Add to Watchlist</button>
              </div>
           
            </div>
          </div>
        </div>

        <div className="movie-sub-content">
          <div className="movie-sub-media">
            
            <Recommendations
            recommendations={this.state.movie.recommendations.results}
            />
            
          </div>
          <div className="movie-sub-credits">
            <div className="cast-group">
              
              <Directors
              directors={this.state.movie.credits.crew}
              blankPerson={blankPerson}
              />

              <Writers 
              writers={this.state.movie.credits.crew}
              blankPerson={blankPerson}
              />

            </div>
            
            <div className="cast-group">

              <Actors 
              stars={this.state.movie.credits.cast}
              blankPerson={blankPerson}
              />

            </div>
          
          </div>

        </div>

      </div>
    );
  }
}

export default Movie;
