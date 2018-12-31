import { connect } from "react-redux";
import { getChannelName } from "../utility";
import LoginForm from "./LoginForm";

const mapStateToProps = state => {
  const channelName = getChannelName(state.router);

  return { channelName };
};

const LoginFormContainer = connect(mapStateToProps)(LoginForm);

export default LoginFormContainer;
