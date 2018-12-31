import React, { Component } from "react";
import ReactGA from "react-ga";

class NotFound extends Component {
  componentDidMount = () => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.pageview("/notfound");
    }
  };

  render() {
    return <div className="flex-grow">Route not Found</div>;
  }
}

export default NotFound;
