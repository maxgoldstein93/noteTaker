const path = require("path")
const express = require('express');
const fs = require("fs");
let db = require("./db/db.json");



const app = express()

const PORT = 3636

app.use(express.urlencoded({ extended: true }));
app.use(express.json());





// // API Routes

// Get /api/notes
app.get("/api/notes", function (req, res) {
  res.json(db);
});

app.post("/api/notes", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;
  newNote.id = db.length
  console.log(db);
  db.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(db, "utf8", null, 2), err => {
    if (err) throw err;
    res.json(db);
  });

});

// delete api/notes/:id

// I COULD NOT GET THE APP.Delete to work //
// ==============================================
app.delete('/api/notes/:id', function (req, res) {
  var updatedNote = req.params.id
  var newNotes = []
  for (let i = 0; i <= db.length; i++) {
    if (updatedNote !== db[i].id) {
      newNotes.push(db[i]);


    }
  }
  db = newNotes;
  fs.writeFile("./db/db.json", JSON.stringify(db, "utf8", null, 2), err => {
    if (err) throw err;

  });
  res.json(db);

})

// HTML Routes

app.use(express.static('public'))


// Get /notes(.html)

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Get * index.html

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}/`);
});




