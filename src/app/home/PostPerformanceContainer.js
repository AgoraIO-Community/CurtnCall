import { connect } from "react-redux";
import PostPerformance from "./PostPerformance";
import { getChannelName } from "../utility";

const mapStateToProps = state => {
  const {
    adminPulledPlug,
    audiencePulledPlug,
    previousPerformer,
    votingEnd
  } = state.home;
  const channelName = getChannelName(state.router);

  return {
    adminPulledPlug,
    audiencePulledPlug,
    channelName,
    previousPerformer,
    votingEnd
  };
};

const PostPerformanceContainer = connect(mapStateToProps)(PostPerformance);

export default PostPerformanceContainer;
