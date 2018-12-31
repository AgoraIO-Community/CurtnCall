import { connect } from "react-redux";
import ChannelViewerPulledPlug from "./ChannelViewerPulledPlug";
import { getChannelName } from "../utility";
const mapStateToProps = state => {
  const { nextPerformer, performanceEnd } = state.home;
  const channelName = getChannelName(state.router);

  return {
    channelName,
    nextPerformer,
    performanceEnd
  };
};

const ChannelViewerPulledPlugContainer = connect(mapStateToProps)(
  ChannelViewerPulledPlug
);

export default ChannelViewerPulledPlugContainer;
