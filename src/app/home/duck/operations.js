import { Creators as homeCreators } from "./actions";
import { capitalize } from "../../utility";
import { serverChannelVars } from "../../utility/vars";

const setChannel = (channel, clientTime) => {
  return dispatch => {
    dispatch(homeCreators.setChannelToInitialState());

    let delta = clientTime - channel.serverTime;

    console.log("delta", delta);

    dispatch(homeCreators.setDelta(delta));

    for (let i = 0; i < serverChannelVars.length; i++) {
      const channelVar = serverChannelVars[i];

      if (channelVar === "reactionCounts") {
        continue;
      }

      const dispatchValue = channel[`${channelVar}`];
      const dispatchFunction = homeCreators[`set${capitalize(channelVar)}`];
      dispatch(dispatchFunction(dispatchValue));
    }
  };
};

export default {
  setChannel
};
