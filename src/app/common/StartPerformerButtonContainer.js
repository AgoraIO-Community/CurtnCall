import { connect } from "react-redux";
import StartPerformerButton from "./StartPerformerButton";
import { getChannelName } from "../utility";

const mapStateToProps = state => {
  const channelName = getChannelName(state.router);
  const {
    agoraClient,
    agoraId,
    camera,
    currentPerformer,
    microphone,
    showPerformerSidebar,
    upcomingShow,
    userIsCurrentPerformer
  } = state.home;

  return {
    agoraClient,
    agoraId,
    camera,
    channelName,
    currentPerformer,
    microphone,
    showPerformerSidebar,
    upcomingShow,
    userIsCurrentPerformer
  };
};

const StartPerformerButtonContainer = connect(mapStateToProps)(
  StartPerformerButton
);

export default StartPerformerButtonContainer;
