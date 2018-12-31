import { connect } from "react-redux";
import RemoteVideo from "./RemoteVideo";
import { getChannelName } from "../utility";

const mapStateToProps = state => {
  const channelName = getChannelName(state.router);
  const { performanceReady, viewerStream } = state.home;

  return {
    channelName,
    performanceReady,
    viewerStream
  };
};

const RemoteVideoContainer = connect(mapStateToProps)(RemoteVideo);

export default RemoteVideoContainer;
