import { connect } from "react-redux";
import ChannelViewer from "./ChannelViewer";
import { getChannelName } from "../utility";

const mapStateToProps = state => {
  const {
    agoraClient,
    currentPerformer,
    nextPerformer,
    performanceEnd,
    performanceReady,
    reactionTimeout,
    viewerCount
  } = state.home;
  const channelName = getChannelName(state.router);

  return {
    agoraClient,
    channelName,
    currentPerformer,
    nextPerformer,
    performanceEnd,
    performanceReady,
    reactionTimeout,
    viewerCount
  };
};

const ChannelViewerContainer = connect(mapStateToProps)(ChannelViewer);

export default ChannelViewerContainer;
