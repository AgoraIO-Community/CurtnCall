import { connect } from "react-redux";
import PerformanceUploadAlert from "./PerformanceUploadAlert";
import { Creators as homeCreators } from "./duck/actions";

const mapDispatchToProps = dispatch => {
  const setPerformanceUploadProgress = performanceUploadProgress => {
    dispatch(
      homeCreators.setPerformanceUploadProgress(performanceUploadProgress)
    );
  };

  return {
    setPerformanceUploadProgress
  };
};

const PerformanceUploadAlertContainer = connect(
  null,
  mapDispatchToProps
)(PerformanceUploadAlert);

export default PerformanceUploadAlertContainer;
