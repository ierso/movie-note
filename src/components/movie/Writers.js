import  React from 'react'


export const Writers = (props) => {

    return (
            <div className="written">
                <h4 className="info-title">Writers:</h4>
                <hr></hr>
                  {props.writers.map(function(writer, index){
                      if(writer.department === 'Writing'){
                        return(
                        <div className="profile writer" key={index}>
                            <div className="profile-image">
                            {
                                (writer.profile_path === null)
                                ? <div className="blank-profile" style={props.blankPerson}></div>
                                : <img className="movie-profile-img" src={
                                `https://image.tmdb.org/t/p/w66_and_h66_bestv2${writer.profile_path}`
                                }  alt={writer.name}/>
                            }
                            </div>
                            <div className="profile-name">
                            <p className="writer-name name-title">{writer.name}</p>
                            <p className="writer-job name-title-sub">{writer.job}</p>
                            </div>
                        </div>
                        )
                      }else{
                          return false
                      }
                  })}
              </div>
        )
    }

