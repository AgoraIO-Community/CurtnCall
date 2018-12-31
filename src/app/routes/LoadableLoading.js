import React from "react";
import Curtain from "../common/Curtain";

const LoadableLoading = ({ error, pastDelay, timedOut }) => {
  if (error) {
    return <div>Error in LoadableLoading!</div>;
  } else if (timedOut) {
    return <div>Taking a long time...</div>;
  } else if (pastDelay) {
    return <Curtain loading />;
  } else {
    return <Curtain loading />;
  }
};

export default LoadableLoading;
