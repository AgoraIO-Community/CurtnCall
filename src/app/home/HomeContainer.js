import { connect } from "react-redux";
import Home from "./Home";
import { getChannelName } from "../utility";
import { homeOperations } from "./duck";
import { Creators as homeCreators } from "./duck/actions";
import { Creators as generalCreators } from "../duck/actions";

const mapStateToProps = state => {
  const { iotId, loginService } = state.general;
  const channelName = getChannelName(state.router);
  const {
    agoraClient,
    channelSegment,
    localStream,
    performanceUploadProgress,
    setPerformanceReady,
    show,
    userIsCurrentPerformer,
    userIsPreviousPerformer,
    viewerPulledPlug,
    viewerStream
  } = state.home;

  return {
    agoraClient,
    channelName,
    channelSegment,
    iotId,
    localStream,
    loginService,
    performanceUploadProgress,
    setPerformanceReady,
    show,
    userIsCurrentPerformer,
    userIsPreviousPerformer,
    viewerPulledPlug,
    viewerStream
  };
};

const mapDispatchToProps = dispatch => {
  const setChannel = (channel, clientTime) => {
    dispatch(homeOperations.setChannel(channel, clientTime));
  };

  const resetDelta = () => {
    dispatch(homeCreators.setDelta(null));
  };

  const setChannelReady = channelReady => {
    dispatch(homeCreators.setChannelReady(channelReady));
  };

  const setPerformanceReady = performanceReady => {
    dispatch(homeCreators.setPerformanceReady(performanceReady));
  };

  const setShow = show => {
    dispatch(homeCreators.setShow(show));
  };

  const setLocalCognitoIdentityId = localCognitoIdentityId => {
    dispatch(generalCreators.setLocalCognitoIdentityId(localCognitoIdentityId));
  };

  return {
    resetDelta,
    setChannel,
    setChannelReady,
    setLocalCognitoIdentityId,
    setPerformanceReady,
    setShow
  };
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;
