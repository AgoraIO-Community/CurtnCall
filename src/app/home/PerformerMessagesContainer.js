import { connect } from "react-redux";
import PerfomerMessages from "./PerformerMessages";

const mapStateToProps = state => {
  const { performerMessages } = state.home;

  return {
    performerMessages
  };
};

const PerformerMessagesContainer = connect(mapStateToProps)(PerfomerMessages);

export default PerformerMessagesContainer;
