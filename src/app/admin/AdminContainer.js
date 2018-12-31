import { connect } from "react-redux";
import Admin from "./Admin";
import { getChannelName } from "../utility";

const mapStateToProps = state => {
  const channelName = getChannelName(state.router);

  return {
    channelName
  };
};

const AdminContainer = connect(mapStateToProps)(Admin);

export default AdminContainer;
