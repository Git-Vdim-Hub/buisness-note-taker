//Initialize all required dependencies/file paths
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
//port for live and local host deployment
const PORT = process.env.PORT || 5500;
const app = express();

//standard express server initiation declarations
app.use(express.json());
app.use(express.urlencoded({ extened: true }));
app.use(express.static('public'));



//get request for notes.html after splash page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
//get request for notes API
app.get('/api/notes', (req,res) => {
    fs.readFile('./db/db.json',(err, data) =>{
        res.status(200).json(JSON.parse(data));
    })
})


//post request to add to the db.json file based on not input
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    const {title, text} = req.body;
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

//delete request to remove notes from the note taker
app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request recieved to add a review`);
    const checkId = req.params.id;
    fs.readFile('./db/db.json', (err, data) =>{
        if(err){
            console.log (err);
        } else {
            const parsedDeleteNotes = JSON.parse(data);
            for(let i = 0; i<parsedDeleteNotes.length; i++){
                if(parsedDeleteNotes[i].id == checkId){
                    parsedDeleteNotes.splice(i,1);
                }
            }

            fs.writeFile('./db/db.json', JSON.stringify(parsedDeleteNotes, null, 3),
            (writeErr) => {
               if(writeErr){
                   console.error(writeErr);
                   res.send("Update Write Error");
               } else{
                   res.send("Update Complete");
               }
            }    
           );
        }
    });
});

//initial call to render the splash page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/')));
//listening for server events
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`));
