const path = require("path")
const express = require('express');
const fs = require("fs");
let db = require("./db/db.json");




const app = express()

const PORT = process.env.PORT || 3636;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());





// // API Routes

// Get /api/notes
app.get("/api/notes", function (req, res) {
  res.json(db);
});
// Post /api/notes
app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  newNote.id = db.length
  console.log(db);
  db.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(db, "utf8", null, 2), err => {
    if (err) throw err;
    res.json(db);
  });

});


// Delete /api/notes  // working with a bug...
app.delete("/api/notes/:id", function(req, res) {
  db.splice(req.params.id, 1 );
  
  fs.writeFile("./db/db.json", JSON.stringify(db, "utf8", null, 2), err => {
        if (err) throw err;
        res.json(db);
      });
      // res.json(db);
  
  console.log("Deleted note with id "+req.params.id);
});


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




