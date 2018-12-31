import { connect } from "react-redux";
import Navbar from "./Navbar";
import { getChannelName, getIsAdminPage } from "../utility";

const mapStateToProps = state => {
  const {
    channelReady,
    channelSegment,
    delta,
    localStream,
    show,
    showRequired,
    userInLineup,
    userIsCurrentPerformer,
    userIsPreviousPerformer
  } = state.home;
  const channelName = getChannelName(state.router);
  const isAdminPage = getIsAdminPage(state.router);

  return {
    channelName,
    channelReady,
    channelSegment,
    delta,
    isAdminPage,
    localStream,
    show,
    showRequired,
    userIsPreviousPerformer,
    userIsCurrentPerformer,
    userInLineup
  };
};

const NavbarContainer = connect(mapStateToProps)(Navbar);

export default NavbarContainer;
