import  React from 'react'
import { Link } from 'react-router';

export const SideBar = (props) => {

    return (
        <div className="Movie-Note">
          <h1>Movie Note</h1>
          <ul>
            <li><Link activeStyle={{color: 'red'}} to="/movie/robocop">Movie Test 1</Link></li>
            <li><Link activeStyle={{color: 'red'}} to="/movie/batman">Movie Tes 2</Link></li>
          </ul>
        </div>
    )
}
 