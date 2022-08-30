import React, { useState, useEffect } from "react";
import Footer from "./footer";
import Header from "./header";
import Notes from "./Notes";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([
    {
      key: "",
      title: "",
      content: "",
    },
  ]);
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((jsonRes) => setNotes(jsonRes));
  }, []);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  return (
    <div>
      <React.StrictMode>
        <Header />
        <CreateArea onAdd={addNote} />
        <center>
          <div className="container text-roboto">
            <div className="row align-items-start">
              {notes.map(function (noteitem) {
                return (
                  <Notes
                    key={noteitem._id}
                    title={noteitem.title}
                    content={noteitem.content}
                  />
                );
              })}
            </div>
          </div>
        </center>
        <Footer />
      </React.StrictMode>
    </div>
  );
}

export default App;
