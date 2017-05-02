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

    // componentDidUpdate(){
    //   console.log(this.state.movie.release_date)
    // }

    

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
      backgroundPosition: '50% 50%'
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
            writers.push({name:person.name, img: person.profile_path, job: person.job});
        }
    })

   

    let cast = [];
    this.state.movie.credits.cast.forEach(function (person) {
      cast.push({name:person.name, img: person.profile_path, character: person.character});
    })

    let castNum = cast.length/2
    let newCastNum = Math.ceil(castNum)
    let castGroups = this.createGroupedArray(cast, newCastNum);
    
       
    return (
      <div className="movie"> 
        
        <div className="movie-backdrop" style={backdop}>
        </div>
        <div className="movie-content">
          <div className="movie-media">
            <div className="movie-poster">
              {
                (this.state.movie.poster_path === undefined)
                ? <div className="movie-poster-blank"></div>
                : <img className="movie-poster-img" 
                  src={'http://image.tmdb.org/t/p/w500'+this.state.movie.poster_path} alt={this.state.movie.original_title}/>
              }
            </div>
            <div className="movie-images">
              
              
            </div>
          </div>
          <div className="movie-content">
            <div className="movie-info">
              <div className="title">
                <h1>{this.state.movie.original_title}
                  <sup className="year">
                    {newDate}
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
                        
                        {
                          (index === 0)
                            ? <div>test</div>
                            : <div>testing</div>
                        }  
                        
                      </div>
                      )
                    })
                  }
              </div>
              <div className="movie-rating">
                <h4>{this.state.movie.vote_average} <sup>/ 10</sup></h4>
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
                      <div className="profile director" key={index}>
                        <div className="profile-image">
                          {
                            (director.img === null)
                            ? <div className="blank-profile"></div>
                            : <img className="movie-profile-img" src={
                            `https://image.tmdb.org/t/p/w66_and_h66_bestv2/${director.img}`
                            }  alt={director.name}/>
                          }
                        </div>
                        <div className="profile-name">
                          <p className="name-title">{director.name}</p>
                        </div>
                      </div>
                    )
                  })}
                
              </div>
              <div className="written">
                <h4>Writers:</h4>
                <hr></hr>
                  {writers.map(function(writer, index){
                    return(
                      <div className="profile writer" key={index}>
                        <div className="profile-image">
                          {
                            (writer.img === null)
                            ? <div className="blank-profile"></div>
                            : <img className="movie-profile-img" src={
                            `https://image.tmdb.org/t/p/w66_and_h66_bestv2/${writer.img}`
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
            <div className="cast">
              <h4>Stars</h4>
              <hr></hr>
              <div className="cast-groups">
                <div className="cast-group">
                  {castGroups[0].map(function(star, i){
                    return(
                      <div className="actor" key={i}>
                        <div className="actor-image">
                          {
                            (star.img === null)
                            ? <div className="blank-profile"></div>
                            : <img className="movie-profile-img" src={
                            `https://image.tmdb.org/t/p/w66_and_h66_bestv2/${star.img}`
                            }  alt={star.name}/>
                          }
                        </div>
                        <div className="profile-name">
                          <p className="actor-name name-title">{star.name}</p>
                          <p className="character name-title-sub">as {star.character}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="cast-group">
                  {
                    (castGroups[1] != null)
                    ? castGroups[1].map(function(star, i){
                        return(
                          <div className="actor" key={i}>
                            <div className="actor-image">
                              {
                                (star.img === null)
                                ? <div className="blank-profile"></div>
                                : <img className="movie-profile-img" src={
                                `https://image.tmdb.org/t/p/w66_and_h66_bestv2/${star.img}`
                                }  alt={star.name}/>
                              }
                            </div>
                            <div className="profile-name">
                              <p className="actor-name name-title">{star.name}</p>
                              <p className="character name-title-sub">as {star.character}</p>
                            </div>
                          </div>
                        )
                      })
                    : <div></div>
                  } 
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Movie;
