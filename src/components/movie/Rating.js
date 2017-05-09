import  React from 'react'

import './css/Rating.css'

export const Rating = (props) => {

    return (
        <div className="rating">
            {
                (props.rating)
                 ? props.rating.map(function(country, index){  
                    if (country.iso_3166_1 === 'US' && country.certification !== "") {
                        
                        return(
                            <div key={index} className="cert">
                                {country.certification}
                            </div>
                        )
                        
                    } else{
                        return false
                    }
                })
                : <div></div>
            
            }
        </div>
    )
}
