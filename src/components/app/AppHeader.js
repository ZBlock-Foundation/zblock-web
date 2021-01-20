import React from "react";
import { Link } from "react-router-dom";

// UI Components

const AppHeader = () => {
  return (
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 class="my-0 mr-md-auto font-weight-normal">zblock</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 link link-active" href="#">
          Communities
        </a>
      </nav>
      <a class="btn btn-outline-warning" href="#">
        Connect Metamask
      </a>
    </div>
  );
};

export default AppHeader;
