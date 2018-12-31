import { connect } from "react-redux";
import Voting from "./Voting";
import { getChannelName } from "../utility";

const mapStateToProps = state => {
  const { previousPerformer, votingEnd } = state.home;
  const channelName = getChannelName(state.router);

  return {
    channelName,
    previousPerformer,
    votingEnd
  };
};

const VotingContainer = connect(mapStateToProps)(Voting);

export default VotingContainer;
