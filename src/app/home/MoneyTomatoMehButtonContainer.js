import { connect } from "react-redux";
import MoneyTomatoMehButton from "./MoneyTomatoMehButton";
import { Creators as homeCreators } from "../home/duck/actions";
import { getChannelName } from "../utility";

const mapStateToProps = state => {
  const channelName = getChannelName(state.router);
  const { performanceVote } = state.home;

  return {
    performanceVote,
    channelName
  };
};

const mapDispatchToProps = dispatch => {
  const setPerformanceVote = vote => {
    dispatch(homeCreators.setPerformanceVote(vote));
  };

  return { setPerformanceVote };
};

const MoneyTomatoMehButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoneyTomatoMehButton);

export default MoneyTomatoMehButtonContainer;
