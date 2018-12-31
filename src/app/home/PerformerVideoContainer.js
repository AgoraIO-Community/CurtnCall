import { connect } from "react-redux";
import PerformerVideo from "./PerformerVideo";

const mapStateToProps = state => {
  const { performerStream } = state.home;

  return {
    performerStream
  };
};

const PerformerVideoContainer = connect(mapStateToProps)(PerformerVideo);

export default PerformerVideoContainer;
