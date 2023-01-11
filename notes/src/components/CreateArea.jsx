import React, { useState } from "react";

// "" ke jagah props
function CreateArea(props) {
  const [input, setInput] = useState({
    title: props.title,
    content: props.content,
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
    props.onAdd(input);
    setInput({
      title: input.title,
      content: input.content
    });
    e.preventDefault();

    const newPerson = { ...input};
    console.log(newPerson);

    await fetch("http://localhost:5000/create", {
      method: "POST",
      
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      console.log(error);
      return;
    });
  }

  return (
    <div>
      <form method="POST">
        <input
          name="title"
          onChange={handleChange}
          value={input.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={input.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button type="submit" onClick={handleClick}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
