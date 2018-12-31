import { connect } from "react-redux";
import FacebookLoginButton from "./FacebookLoginButton";
import { Creators as generalCreators } from "../duck/actions";
import { getChannelName } from "../utility";

const mapStateToProps = state => {
  const channelName = getChannelName(state.router);
  const { channelReady } = state.home;

  return {
    channelName,
    channelReady
  };
};

const mapDispatchToProps = dispatch => {
  const setLocalCognitoIdentityId = localCognitoIdentityId => {
    dispatch(generalCreators.setLocalCognitoIdentityId(localCognitoIdentityId));
  };

  return {
    setLocalCognitoIdentityId
  };
};

const FacebookLoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FacebookLoginButton);

export default FacebookLoginButtonContainer;
