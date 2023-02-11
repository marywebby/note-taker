const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001

// need all 3 of these in every project with express, 
app.use(express.static('public'))
app.use(express.json())
// this allows express to understand (:variable) in the route, because express cannot understand the varible without it. 
app.use(express.urlencoded({extended: true}))

// route for add the homepage to the notes page
app.get('/', (req, res) => 
    res.sendfile(path.join(__dirname, '/public/index.html'))
)

// req, is what is being sent to the server, response is what you get back, response is how were responding tot heir request 
app.get('/notes', (req, res) => 
    res.sendfile(path.join(__dirname, '/public/notes.html'))
)

app.listen(PORT, () =>
console.log(`App is listneing at http://localhost:${PORT}`))