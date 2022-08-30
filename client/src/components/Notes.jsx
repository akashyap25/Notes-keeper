import React from "react";

function Notes(props) {
  return (
    <div className="col-md-4 my-3">
      <div className="card shadow">
        <div className="card-body py-3">
          <h4 className="card-title text-start">{props.title}</h4>
          <p className="card-text text-start">{props.content}</p>
        </div>
      </div>
    </div>
  );
}

export default Notes;
