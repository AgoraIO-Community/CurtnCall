import Loadable from "react-loadable";
import LoadableLoading from "../routes/LoadableLoading";

const LoadableWrapper = ({ loader }) =>
  Loadable({
    loading: LoadableLoading,
    loader,
    delay: 300,
    timeout: 5000
  });

export default LoadableWrapper;
