import React, { useState } from "react";

function CreateArea(props) {
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  async function handleClick(e) {
    e.preventDefault();

    const newPerson = { ...input };

    await fetch("http://localhost:5000/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  }

  return (
    <center>
      <form method="POST" action="/create">
        <div className="container text-roboto my-5">
          <div className="card text-dark bg-light mb-3 shadow  card-notes">
            <div className="card-header">Note</div>
            <ul className="list-group ">
              <li className="list-group-item border-0 p-0">
                <div className="input-group ">
                  <input
                    name="title"
                    onChange={handleChange}
                    value={input.title}
                    type="text"
                    className="form-control border-0 "
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    id="input"
                    placeholder="Title"
                    autoComplete="off"
                    style={{ color: "inherit", boxShadow: "none" }}
                  />
                </div>
              </li>
              <li className="list-group-item border-0 p-0">
                <div className="input-group  ">
                  <textarea
                    name="content"
                    className="form-control border-0 pt-4 pb-0"
                    aria-label="With textarea"
                    onChange={handleChange}
                    value={input.content}
                    autoComplete="off"
                    placeholder="Take a note"
                    style={{
                      resize: "none",
                      color: "inherit",
                      boxShadow: "none",
                    }}
                  ></textarea>
                </div>
              </li>
            </ul>
            <div className="card-footer bg-transparent border-success ">
              <button
                type="button"
                className="btn btn-outline-dark rounded-pill"
                onClick={handleClick}
              >
                add &nbsp;&nbsp;
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </center>
  );
}

export default CreateArea;
