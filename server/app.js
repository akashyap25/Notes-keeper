const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(
  "<mongodb connection url>",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (!err) {
      console.log("Database Connected..");
    } else console.log("Database Connection Error..", err);
  }
);

const notesSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Notes = mongoose.model("Notes", notesSchema);

app.get("/", function (req, res) {
  Notes.find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.post("/create", function (req, res) {
  var db = mongoose.connection;
  const title = req.body.title;
  const content = req.body.content;
  const newNote = {
    title: title,
    content: content,
  };

  db.collection("notes").insertOne(newNote, (err, collection) => {
    if (err) {
      console.log(err);
    }
    console.log("Record Inserted Successfully");
  });
});

app.listen(PORT, function () {
  console.log("Server is alive");
});
