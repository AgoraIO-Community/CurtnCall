import React, { Component } from "react";
import ReactPlayer from "react-player";
import { handleRecording } from "./agora";

export default class RemoteRecordStream extends Component {
  componentDidMount = async () => {
    const {
      performanceId,
      setPerformanceUploadProgress,
      remoteStream
    } = this.props;

    await handleRecording(
      remoteStream,
      performanceId,
      setPerformanceUploadProgress
    );
  };

  render() {
    const { remoteStream } = this.props;
    return (
      <ReactPlayer
        url={remoteStream}
        muted
        height="100%"
        width="100%"
        playing
        style={{ display: "none" }}
      />
    );
  }
}
