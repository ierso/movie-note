import  React from 'react'
import { Link } from 'react-router';

export const SideBar = (props) => {
    
    return (
        <div className="movie-note">
          <div className="user">
            <p>welcome</p>
          </div>
          <div className="sidebar-title">
            <h2><Link className="sidebar-title" onlyActiveOnIndex activeStyle={{backgroundColor: '#383a4e'}} to="/">Recent Movies</Link></h2>
          </div>
          <div className="sidebar-title">
            <h2>Watchlist</h2>
          </div>
          <div className="watchlist">
            <ul>
              {props.watchList.map((movie)=>{
                return (
                <li key={movie.id}>
                  <Link activeStyle={{backgroundColor: '#383a4e'}} to={`/movie/${movie.id}`}>
                    <input className="checkbox" type="checkbox" onChange={() => props.removeMovie(movie.id)} defaultChecked={movie.remove}/> 
                    {movie.title}
                  </Link>
                </li>
                )
              })}
            </ul>
          </div>
        </div>
    )
}
 