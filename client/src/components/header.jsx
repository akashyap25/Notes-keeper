import React from "react";

function Header() {
  return (
    <nav className="navbar navbar-light bg-light px-5 pb-2 pt-5 shadow-sm mb-5 bg-body rounded">
      <div className="container-fluid justify-content-center">
        <figure>
          <blockquote className="blockquote">
            <h1>Keep Notes</h1>
          </blockquote>
          <figcaption className="blockquote-footer fw-bold fs-3 font-monospace">
            anonymously!
          </figcaption>
        </figure>
      </div>
    </nav>
  );
}

export default Header;
