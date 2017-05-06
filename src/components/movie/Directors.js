import  React from 'react'

export const Directors = (props) => {

    return (
        <div className="director">
        <h4 className="info-title">Directors</h4>
        <hr></hr>
        {
            props.directors.map(function(director, index){
                if(director.department === 'Directing'){
                return(
                    <div className="profile director" key={index}>
                        <div className="profile-image">
                            {
                                (director.profile_path === null)
                                ? <div className="blank-profile"></div>
                                : <img className="movie-profile-img" src={
                                `https://image.tmdb.org/t/p/w66_and_h66_bestv2${director.profile_path}`
                                }  alt={director.name}/>
                            }
                        </div>
                        <div className="profile-name">
                            <p className="name-title">{director.name}</p>
                        </div>
                    </div>
                )
                }else{
                    return false
                }  
            })
        }
            
        </div>
    )
}