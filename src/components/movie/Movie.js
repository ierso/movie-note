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
    this.state.movie.credits.crew.forEach(function (person) {
        if (person.job === 'Director') {
            directors.push({name:person.name, img: person.profile_path});
        }
    })

    let writers = [];
    this.state.movie.credits.crew.forEach(function (person) {
        if (person.department === 'Writing') {
            writers.push({name:person.name, img: person.profile_path});
        }
    })

    let cast = [];
    this.state.movie.credits.cast.forEach(function (person) {
      cast.push({name:person.name, img: person.profile_path, character: person.character});
    })
    console.log(cast)
    
  
    return (
      <div className="movie" style={style}>
        <div className="movie-media">
          <div className="movie-poster">
            <img className="movie-poster-img" src={'http://image.tmdb.org/t/p/w500'+this.state.movie.poster_path} alt={this.state.movie.original_title}
            />
          </div>
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
        <div className="movie-content">
          <div className="movie-info">
            <div className="title">
              <h1>{this.state.movie.original_title}
                <sup className="year">
                  {this.state.movie.release_date}
                </sup>
              </h1>
            </div>
            <div className="plot">
              <p>{this.state.movie.overview}</p>
            </div>
            <div className="runtime">
              <h4><span>Runtime:</span> {this.state.movie.runtime} minutes</h4>
            </div>
            <div className="genre">
              <h4><span>Genre:</span></h4>
              
                {
                this.state.movie.genres.map(function(genre, index){
                  return(
                    <div key={index}>
                      {genre.name}
                    </div>
                    )
                  })
                }
              
            </div>
            <button onClick={this.watchLater} className="button">+ Add to Watchlist</button>
          </div>
        
        <div className="credits">
          <div className="crew">
            <div className="director">
              <h4>Directors</h4>
              <hr></hr>
                {directors.map(function(director, index){
                  return(
                    <div key={index}>
                      <img className="movie-profile-img" src={
                        `https://image.tmdb.org/t/p/w66_and_h66_bestv2/${director.img}`
                        }  alt={director.name}/>
                      {director.name}
                    </div>
                  )
                })}
              
            </div>
            <div className="written">
              <h4>Writters:</h4>
              <hr></hr>
                {writers.map(function(writer, index){
                  return(
                    <div className="writer" key={index}>
                      <img className="movie-profile-img" src={
                        `https://image.tmdb.org/t/p/w66_and_h66_bestv2/${writer.img}`
                        }  alt={writer.name}/>
                      {writer.name}
                    </div>
                  )
                })}
            </div>
          </div>   
          <div className="cast">
            <h4>Stars:</h4>
            <hr></hr>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Movie;
