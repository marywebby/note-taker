const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001
const fs = require('fs')
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const dbJSON = require('./db/db.json')
const { v4: uuidv4 } = require('uuid');

// need all 3 of these in every project with express, 
app.use(express.static('public'))
app.use(express.json())
// this allows express to understand (:variable) in the route, because express cannot understand the varible without it. 
app.use(express.urlencoded({extended: true}))

// route for add the homepage to the notes page, these are express function (app = object, get is the function)
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
)

// req, is what is being sent to the server, response is what you get back, response is how were responding tot heir request 
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.get("/api/notes", (req, res) =>
res.json(dbJSON)
)

// writing a post to place the saved note into the db.json
app.post('/api/notes', (req, res) => {
res.json(`${req.method} request recieved!`)
  
    const { title, text, id} = req.body;
  
    if (req.body) {
      const newNote = {
        id: uuidv4(), 
        title,
        text,
      };
      
      dbJSON.push(newNote)
      readAndAppend(newNote, './db/db.json');
      console.log(`Tip added successfully 🤍`);
    } else {
      console.log('Error in adding tip');
    }
})

// BEGINING OF FIND THE SOLUTION TO THE BONUS CRITERIA, THE DELETE NOTE ASPECT, HAVE NOT FINISHED. 
// app.delete('/api/notes/:id', (req,res) =>
// console.log(res) 
// )

app.listen(PORT, () =>
console.log(`App is listneing at http://localhost:${PORT}`))