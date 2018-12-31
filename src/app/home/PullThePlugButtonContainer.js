import { connect } from "react-redux";
import PullThePlugButton from "./PullThePlugButton";
import { getChannelName } from "../utility";
import { Creators as homeCreators } from "./duck/actions";

const mapStateToProps = state => {
  const channelName = getChannelName(state.router);

  return {
    channelName
  };
};

const mapDispatchToProps = dispatch => {
  const setViewerPulledPlug = viewerPulledPlug => {
    dispatch(homeCreators.setViewerPulledPlug(viewerPulledPlug));
  };

  return { setViewerPulledPlug };
};

const PullThePlugContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PullThePlugButton);

export default PullThePlugContainer;
