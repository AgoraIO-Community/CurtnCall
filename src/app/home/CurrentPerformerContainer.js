import { connect } from "react-redux";
import CurrentPerformer from "./CurrentPerformer";
import { getChannelName } from "../utility";
import { Creators as homeCreators } from "./duck/actions";

const mapStateToProps = state => {
  const {
    agoraClient,
    camera,
    cameras,
    currentPerformer,
    localStream,
    microphone,
    nextPerformer,
    performanceEnd,
    performanceId,
    performanceReady,
    reactionCounts,
    recordingDevices,
    viewerCount,
    viewerStateCount,
    viewers
  } = state.home;

  const channelName = getChannelName(state.router);

  return {
    agoraClient,
    camera,
    cameras,
    channelName,
    currentPerformer,
    localStream,
    microphone,
    nextPerformer,
    performanceEnd,
    performanceId,
    performanceReady,
    reactionCounts,
    recordingDevices,
    viewerCount,
    viewers,
    viewerStateCount
  };
};

const mapDispatchToProps = dispatch => {
  const setPerformanceUploadProgress = performanceUploadProgress => {
    dispatch(
      homeCreators.setPerformanceUploadProgress(performanceUploadProgress)
    );
  };

  return {
    setPerformanceUploadProgress
  };
};

const CurrentPerformerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentPerformer);

export default CurrentPerformerContainer;
