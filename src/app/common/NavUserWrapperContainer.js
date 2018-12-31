import { connect } from "react-redux";
import NavUserWrapper from "./NavUserWrapper";
import { Creators as generalCreators } from "../duck/actions";
import { getChannelName } from "../utility";

const mapStateToProps = state => {
  const { loginService } = state.general;
  const { pathname } = state.router.location;
  let onAdminPage = false;

  const channelName = getChannelName(state.router);

  if (pathname.includes("/admin")) {
    onAdminPage = true;
  }

  return { channelName, loginService, onAdminPage };
};

const mapDispatchToProps = dispatch => {
  const setLocalCognitoIdentityId = agoraId => {
    dispatch(generalCreators.setLocalCognitoIdentityId(agoraId));
  };

  return {
    setLocalCognitoIdentityId
  };
};

const NavUserWrapperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavUserWrapper);

export default NavUserWrapperContainer;
