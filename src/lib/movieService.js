const baseUrl = 'http://www.omdbapi.com/?s='

export const loadMovies = (title) => {
  return fetch(baseUrl + title)
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
