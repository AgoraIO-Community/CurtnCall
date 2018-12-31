import { connect } from "react-redux";
import PerformerSidebar from "./PerformerSidebar";
import { getChannelName } from "../utility";

function mapStateToProps(state) {
  const { iotId } = state.general;
  const channelName = getChannelName(state.router);
  const {
    lineup,
    performanceEnd,
    show,
    showPerformerSidebar,
    userInLineup,
    userIsCurrentPerformer,
    userIsPreviousPerformer,
    viewerCount
  } = state.home;

  return {
    channelName,
    iotId,
    lineup,
    performanceEnd,
    show,
    showPerformerSidebar,
    userIsCurrentPerformer,
    userIsPreviousPerformer,
    userInLineup,
    viewerCount
  };
}

const PerformerSidebarContainer = connect(mapStateToProps)(PerformerSidebar);

export default PerformerSidebarContainer;
