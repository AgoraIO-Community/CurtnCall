import { connect } from "react-redux";

import CountdownTime from "./CountdownTime";

const mapStateToProps = state => {
  const { channelSegment, delta, performanceDuration } = state.home;

  return {
    channelSegment,
    delta,
    performanceDuration
  };
};

const CountdownTimeContainer = connect(mapStateToProps)(CountdownTime);

export default CountdownTimeContainer;
