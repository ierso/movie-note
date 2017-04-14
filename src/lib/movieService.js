const apiKey = 'c2d6b648cfb303b5ae02208a5c91d208';

// const baseUrl = 'http://www.omdbapi.com/?s='
// const baseUrlID = 'http://www.omdbapi.com/?i='
const upcomingUrl = `http://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`

const tmdbTitleApi = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`
const release = '&append_to_response=release_dates'

export const loadRecentMovies = () => {
  return fetch(upcomingUrl + release)
    .then(res => res.json())
    .then((data)=>{
      return data.results
    })
}

export const loadMovies = (title) => {
  return fetch(tmdbTitleApi + title + release)
    .then(res => res.json())
    .then((data)=>{
      return data.results
    })
}

export const loadMovie = (id) => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}${release}`)
    .then(res => res.json())
    .then((data)=>{
      return data.Search
    })
}

// export const createTodo = (todo) =>{
//   return fetch(baseUrl, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(todo)
//   }).then(res => res.json())
// }


// export const destroyTodo = (id) =>{
//   return fetch(`${baseUrl}/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   })
// }
