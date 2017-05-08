import  React from 'react'
import { Link } from 'react-router';

import './css/index.css';

export const SideBar = (props) => {
    
    return (
        <div className="movie-note">
          <div className="user">
            <p>Welcome {props.username}</p>
          </div>
          <div className="sidebar-title">
            <h2><Link className="sidebar-title" onlyActiveOnIndex activeStyle={{backgroundColor: '#383a4e', color:'#ff9104'}} to="/">Recent Movies</Link></h2>
          </div>
          <div className="watchlist-title">
            <h2>Watchlist</h2>
          </div>
          <div className="watchlist">
            <ul>
              {props.watchList.map((movie)=>{
                return (
                <li key={movie.id}>
                  <Link activeStyle={{backgroundColor: '#383a4e', color: '#ff9104'}} to={`/movie/${movie.id}`}>
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
 