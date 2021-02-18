import React from "react";

const AppFooter = () => {
  return (
    <React.Fragment>
      <footer
        className="footer mt-auto py-3 bg-light"
        style={{ position: "absolute", bottom: 0, width: "100%" }}
      >
        <div className="container">
          <p>Copyright &copy; 2021 | ZBlock | All rights reserved.</p>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default AppFooter;
