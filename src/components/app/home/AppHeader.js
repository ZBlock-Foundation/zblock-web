import React from "react";
import { Link } from "react-router-dom";

// UI Components

const AppHeader = () => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <Link to="/app/">zblock</Link>
      </h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link className="btn btn-outline-warning" to="/app/create-community">
          Create Community
        </Link>
      </nav>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link className="btn btn-outline-warning " to="/app/communities">
          Communities
        </Link>
      </nav>
      <button className="btn btn-outline-warning">Connect Metamask</button>
    </div>
  );
};

export default AppHeader;
