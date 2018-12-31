import React, { Component } from "react";
import ReactPlayer from "react-player";

export default class PerformerVideo extends Component {
  render() {
    const { darkBackground, performerStream } = this.props;
    return (
      <div>
        <canvas id="performer-canvas" style={{ display: "none" }} />
        <ReactPlayer
          url={performerStream}
          width={256}
          height={144}
          muted
          // controls
          playing
          style={{
            margin: "0 auto",
            backgroundColor: darkBackground ? "black" : "#22292f"
          }}
        />
      </div>
    );
  }
}
