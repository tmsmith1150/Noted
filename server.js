const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//  render html
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


//  send notes page 
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get("/api/notes", (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = notes.length + 1;
    notes.push(newNote);
    fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const updatedNotes = notes.filter(note => note.id != parseInt(req.params.id));
    fs.writeFile('db/db.json', JSON.stringify(updatedNotes), (err) => {
      if (err) throw err;
      res.json(updatedNotes);
    });
  });
});



// const notesRouter = require('./routes/note');
// app.use('/note', notesRouter);

// notesRouter.post('/', async (req, res) => {
//   const connection = await db.connect();
//   // Perform database operations
//   res.send('Creating a new note');
// });

// const dbRouter = require('./routes/db');
// app.use('/db', dbRouter);



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
});