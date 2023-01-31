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
const fs = require('fs');
const uuid = require('./helpers/uuid');

const PORT = 5500;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extened: true }));
app.use(express.static('public'));



app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('/api/notes', (req,res) => {
    fs.readFile('./db/db.json',(err, data) =>{
        res.status(200).json(JSON.parse(data));
    })
})

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    const {title, text} = req.body;
    console.log(title);
    if(title && text){
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        //read file must be of type string
        fs.readFile('./db/db.json', (err, data) => {
            if(err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 3),
                 (writeErr) => {
                    if(writeErr){
                        console.error(writeErr);
                        res.send("Update Write Error");
                    } else{
                        console.log("Update Complete");
                        res.send("Update Complete");
                    }
                 }    
                ); 
            }
        });   
    } else {
        res.status(500).json('Unable to post review');
    }
});

app.delete('/api/notes/:id', (req, res) => {
    res.status(200);
    console.log("Pikachu");
    // if(req.params.id) {
        //res.redirect('back');
    //     console.info(`${req.method} request recieved to delete a note`);
    //     const noteId = req.params.id;
    //     console.log(noteId);
    //     const response = {
    //         status: 'success',
    //         body: newNote,
    //      };
   
    //       console.log(response);
    //    res.status(201).json(response)
    // }
})
//app.delete('/:id', (req, res) => res.json(`DELETE route`));

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);
