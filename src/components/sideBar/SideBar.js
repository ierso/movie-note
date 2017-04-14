import  React from 'react'
import { Link } from 'react-router';

export const SideBar = (props) => {
    
    return (
        <div className="Movie-Note">
          <h1>Movie Note</h1>
          <ul>
            {props.watchList.map((movie)=>{
              return (
               <li key={movie.id}>
                 <input type="checkbox" onChange={() => props.removeMovie(movie.id)} defaultChecked={movie.remove}/> 
                 <Link activeStyle={{color: 'red'}} to={`/movie/${movie.id}`}>{movie.title}</Link>
               </li>
              )
            })}
          </ul>
        </div>
    )
}
 