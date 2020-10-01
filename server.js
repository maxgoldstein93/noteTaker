const path = require("path")
const express = require('express');
const fs = require("fs");
const db =require("./db/db.json");


const app = express()
 
const PORT =3636

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// API Routes

// Get /api/notes
app.get("/api/notes", function(req, res) {
  return res.json(db);
});
// get data from db.json
// return res.json(data);


// fs.readFile("./db/db.json", "utf8", function (err, data){
//   console.log(data)
// })
// post api/notes
// receive json obj from front end

app.post("/api/tables", function(req, res) {
    db.push(req.body);
     return res.json(true);
 
});
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




