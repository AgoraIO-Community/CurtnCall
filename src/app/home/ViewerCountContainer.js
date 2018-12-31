import { connect } from "react-redux";
import ViewerCountComponent from "./ViewerCountComponent";

const mapStateToProps = state => {
  const { viewerCount } = state.home;
  return {
    viewerCount
  };
};

const ViewerCountContainer = connect(mapStateToProps)(ViewerCountComponent);

export default ViewerCountContainer;
