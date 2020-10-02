const path = require("path")
const express = require('express');
const fs = require("fs");
const db =require("./db/db.json");
const util = require("util")


const app = express()
 
const PORT =3636

app.use(express.urlencoded({ extended: true }));
app.use(express.json());





// // API Routes

// Get /api/notes
app.get("/api/notes", function(req, res) {
  res.json(db);
});

app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;
  console.log(db);
  db.push(newNote);
  fs.writeFile("./db/db.json",JSON.stringify(db, null, 2),err => {
    if (err) throw err;
    return true;
  });
  res.json(db);
});

// post api/notes
// receive json obj from front end
// writefile
// return res.status(200).end()

// delete api/notes/:id

// HTML Routes

app.use(express.static('public'))


// Get /notes(.html)

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

// Get * index.html

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

app.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}/`);
  });




