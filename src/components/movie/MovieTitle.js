import  React from 'react'

import './css/MovieTitle.css'

export const MovieTitle = (props) => {
    return (
        <div className="movie-title">
            <h1>{props.title}
                <sup className="year">
                {props.date}
                </sup>
            </h1>
        </div>
    )
}
 