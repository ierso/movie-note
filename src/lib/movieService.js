const baseUrl = 'http://www.omdbapi.com/?s='
const baseUrlID = 'http://www.omdbapi.com/?i='


const tmdbTitleApi = 'https://api.themoviedb.org/3/search/movie?api_key=c2d6b648cfb303b5ae02208a5c91d208&query='

export const loadMovies = (title) => {
  return fetch(tmdbTitleApi + title)
    .then(res => res.json())
    .then((data)=>{
      console.log(`time will tell ${data.results}`)
      return data.results
    })
}

export const loadMovie = (id) => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c2d6b648cfb303b5ae02208a5c91d208&query`)
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
