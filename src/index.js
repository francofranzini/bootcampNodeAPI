const express = require('express')
const app = express()
const axios = require('axios')


app.use(express.json())


const fetchNotes = () =>{
  axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    return response
  })
}

const notes = fetchNotes()

const hello = '<h1>Hello Nashe</h1>'

app.get('/',(request, response) =>{
  response.send(hello)
})

app.get('/api/notes', (request, response) =>{
  response.json(notes)
})
app.post('/api/notes', (request, response) =>{
  const note = request.body
  console.log(note)
  //buscar la id mas grande
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  //crear la nueva nota
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: true,
    date: new Date().toISOString()

  }
  //añadirlo a las notas
  notes = [...notes, newNote]
  
  response.json(newNote)
})

app.get('/api/notes/:id', (request, response) =>{
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);
  if(note){
    response.json(note);
  }else{
    response.status(404).end()
  }

  })
app.delete('/app/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();
})

const PORT = 3001
app.listen(PORT)
console.log(notes)
console.log('Server running on port ' + PORT )