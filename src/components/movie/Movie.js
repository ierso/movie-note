import React, { Component } from 'react';
import {addMovie} from '../../lib/watchListHelpers'

import {MoviePoster} from './MoviePoster'
import {Rating} from './Rating'
import {Recommendations} from './Recommendations'
import {Directors} from './Directors'
import {Genre} from './Genre'

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

  changeDate = (date) => {
    return date.split('-')[0]
  }

  createGroupedArray = (arr, chunkSize) => {
    var groups = [], i;
      for (i = 0; i < arr.length; i += chunkSize) {
          groups.push(arr.slice(i, i + chunkSize));
      }
    return groups;
  }


  render() {

    let date = `${this.state.movie.release_date}`
    let newDate = this.changeDate(date)

    // console.log(JSON.stringify(this.state.movie))
    let imgUrl = `https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}`
    let backdop = {
      backgroundColor: '#eee',
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center 15%',
      filter: 'brightness(120%) grayscale(40%)'
    }



    let writers = [];
    this.state.movie.credits.crew.forEach(function (person) {
        if (person.department === 'Writing') {
            writers.push({name:person.name, img: person.profile_path, job: person.job});
        }
    })

    // let cast = [];
    // this.state.movie.credits.cast.forEach(function (person) {
    //   cast.push({name:person.name, img: person.profile_path, character: person.character});
    // })

    // let castNum = cast.length/2
    // let newCastNum = Math.ceil(castNum)
    // let castGroups = this.createGroupedArray(cast, newCastNum);


    let genres = this.state.movie.genres

    console.log(this.state.movie)

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

              <div className="movie-title">
                <h1>{this.state.movie.original_title}
                  <sup className="year">
                    {newDate}
                  </sup>
                </h1>
              </div>

              <div className="movie-attributes">

                <Rating
                rating={this.state.movie.releases.countries}
                />

                <div className="runtime">
                  <h4>{this.state.movie.runtime} min</h4>
                </div>

                <Genre 
                genres={this.state.movie.genres}/>
                

              </div>
              <div className="plot">
                <p>{this.state.movie.overview}</p>
              </div>
              <div className="movie-rating">
                <h4>{this.state.movie.vote_average} <sup>/ 10</sup></h4>
              </div>
              <button onClick={this.watchLater} className="button">+ Add to Watchlist</button>
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
              />


              <div className="written">
                <h4 className="info-title">Writers:</h4>
                <hr></hr>
                  {writers.map(function(writer, index){
                    return(
                      <div className="profile writer" key={index}>
                        <div className="profile-image">
                          {
                            (writer.img === null)
                            ? <div className="blank-profile"></div>
                            : <img className="movie-profile-img" src={
                            `https://image.tmdb.org/t/p/w66_and_h66_bestv2${writer.img}`
                            }  alt={writer.name}/>
                          }
                        </div>
                        <div className="profile-name">
                          <p className="writer-name name-title">{writer.name}</p>
                          <p className="writer-job name-title-sub">{writer.job}</p>
                        </div>
                      </div>
                    )
                  })}
              </div>
               
              
            </div>
            
            <div className="cast-group">
                <h4 className="info-title">Actors</h4>
                <hr></hr>
                {this.state.movie.credits.cast.map(function(star, i){
                  if (i <= 6){
                    return(
                      <div className="actor" key={i}>
                        <div className="actor-image">
                          {
                            (star.img === null)
                            ? <div className="blank-profile"></div>
                            : <img className="movie-profile-img" src={
                            `https://image.tmdb.org/t/p/w66_and_h66_bestv2/${star.profile_path}`
                            }  alt={star.name}/>
                          }
                        </div>
                        <div className="profile-name">
                          <p className="actor-name name-title">{star.name}</p>
                          <p className="character name-title-sub">as {star.character}</p>
                        </div>
                      </div>
                    )
                  }else{
                    return false
                  }
                })}
              </div>
          </div>

        </div>

      </div>
    );
  }
}

export default Movie;
