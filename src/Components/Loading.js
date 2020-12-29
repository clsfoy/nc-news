import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
const Loading = () => {
  return (
    <>
      <Loader
        type="Circles"
        style={{ textAlign: "center" }}
        color="black"
        height={100}
        width={100}
        timeout={10000} //3 secs
      />
    </>
  );
};

export default Loading;
