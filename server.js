//PSEUDO CODE
//Server JS
//FIGRURE OUT HOW TO WORK WITH TWO HTML FILES/CHECK LESSONS
//2. we need a post and a get to api/notes (delete bonus)
//-when talking post or get we are talking from client view
//so we are getting data from the server and we are posting data
//to the server
//2a. get- need to get the page
//we are working with a db that is is in the file tree with .json ext
//so use .json
//3. we also need the bodies for those two/three
//4

const express = require('express');
const path = require('path');
const db = require('./db/db.json');

const PORT = 5500;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extened: true }));

app.use(express.static('public'));



app.get('/api/notes', (req,res) => {
    console.log("PikaPika")
    res.json(db);
})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);
