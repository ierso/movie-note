import  React from 'react'

import './css/Genre.css'

export const Genre = (props) => {
    
    if(props.genres){
        return (
            <div className="genre">
              {props.genres.map(function(genre, index){
                  if(props.genres.length -1 === index){
                    return(
                    <div key={index} className="genre-title">{genre.name}</div>
                    )
                }else if(props.genres.length -2 === index){
                    return(
                    <div key={index} className="genre-title">{genre.name + ' &'}</div>
                    )
                }else{
                    return(
                    <div key={index} className="genre-title">{genre.name},</div>
                    )
                }
              })}
            </div>
        )
    }
    
}


