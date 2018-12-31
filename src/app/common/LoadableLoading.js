import React from "react";

const LoadableLoading = ({ error, pastDelay, timedOut }) => {
  if (error) {
    return <div>Error loading!</div>;
  } else if (timedOut) {
    return <div>Taking a long time to load...</div>;
  } else if (pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
};

export default LoadableLoading;
