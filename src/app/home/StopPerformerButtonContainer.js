import { connect } from "react-redux";

import { getChannelName } from "../utility";
import StopPerformerButton from "./StopPerformerButton";

const mapStateToProps = state => {
  const { userIsCurrentPerformer } = state.home;
  const channelName = getChannelName(state.router);

  return {
    userIsCurrentPerformer,
    channelName
  };
};

const StopPerformerButtonContainer = connect(mapStateToProps)(
  StopPerformerButton
);

export default StopPerformerButtonContainer;
