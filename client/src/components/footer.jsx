import React from "react";

function Footer() {
  const currentyear = new Date().getFullYear();

  return (
    <div className="mt-5  text-center ">
      <ul className="list-inline">
        <li className="list-inline-item">
          <a
            target="_blank"
            href="https://github.com/westernfrog"
            className="nav-link p-0 text-muted"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github fa-2xl"></i>
          </a>
        </li>
        <li className="list-inline-item">
          <a
            target="_blank"
            href="https://twitter.com/iam__amansingh"
            className="nav-link p-0 text-muted mx-5"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-twitter fa-2xl"></i>
          </a>
        </li>
        <li className="list-inline-item">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/amansingh123"
            className="nav-link p-0 text-muted"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin-in fa-2xl"></i>
          </a>
        </li>
      </ul>
      <p className="text-muted font-monospace">
        Copyright &copy; {currentyear}
      </p>
    </div>
  );
}

export default Footer;
