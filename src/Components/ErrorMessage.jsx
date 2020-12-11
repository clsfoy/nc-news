import React from "react";

const ErrorMessage = (props) => {
  return (
    <div className="errors-container">
      {<h4 className="errors">{props.errorMessage}</h4>}
    </div>
  );
};

export default ErrorMessage;
