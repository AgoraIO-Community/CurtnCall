import { createReducer } from "reduxsauce";
import { Types } from "./actions";
import {
  allCapsUnderscore,
  reactions,
  stateCountObj as viewerStateCount
} from "../../utility";
import { localChannelVars, serverChannelVars } from "../../utility/vars";

let reactionCounts = {};

reactions.forEach(reaction => {
  reactionCounts[`${reaction}`] = 0;
});

const INITIAL_STATE = {
  agoraClient: null,
  agoraId: null,
  adminPulledPlug: false,
  audiencePulledPlug: false,
  camera: null,
  currentPerformer: null,
  channelReady: false,
  channelSegment: null,
  delta: null,
  lineup: [],
  localStream: null,
  microphone: null,
  nextPerformer: null,
  performanceId: null,
  performanceReady: false,
  performanceVote: null,
  performerMessages: [],
  performerStream: null,
  previousPerformer: null,
  reactionCounts,
  show: null,
  showPerformerSidebar: false,
  showRequired: true,
  upcomingShow: null,
  userInLineup: false,
  userIsCurrentPerformer: false,
  userIsPreviousPerformer: false,
  userIsNextPerformer: false,
  viewerCount: 0,
  viewerPulledPlug: false,
  viewers: [],
  viewerStateCount,
  viewerStream: null
};

let HANDLERS = {};

const setChannelToInitialState = (state = INITIAL_STATE, action) => {
  state = INITIAL_STATE;
  return state;
};

HANDLERS[Types["SET_CHANNEL_TO_INITIAL_STATE"]] = setChannelToInitialState;

for (let i = 0; i < serverChannelVars.length; i++) {
  const serverChannelVar = serverChannelVars[i];

  const reducerFunction = (state = INITIAL_STATE, action) => {
    let reducerObj = { ...state };

    reducerObj[serverChannelVar] = action[serverChannelVar];
    return reducerObj;
  };

  const allCapUnderscoreChannelVar = `SET_${allCapsUnderscore(
    serverChannelVar
  )}`;

  HANDLERS[Types[allCapUnderscoreChannelVar]] = reducerFunction;
}

for (let i = 0; i < localChannelVars.length; i++) {
  const localChannelVar = localChannelVars[i];

  let reducerFunction;

  switch (localChannelVar) {
    case "performerMessages":
      reducerFunction = (state = INITIAL_STATE, action) => {
        let reducerObj = { ...state };
        let newArray;

        if (action.performerMessages.length > 4) {
          newArray = action.performerMessages.slice(0, -1);
        } else {
          newArray = action.performerMessages.slice();
        }

        reducerObj[localChannelVar] = newArray;
        return reducerObj;
      };

      break;

    default:
      reducerFunction = (state = INITIAL_STATE, action) => {
        let reducerObj = { ...state };

        if (typeof state[localChannelVar] === "boolean") {
          //Since this is a boolean that means we just toggle the state
          reducerObj[localChannelVar] = !state[localChannelVar];
        } else {
          reducerObj[localChannelVar] = action[localChannelVar];
        }

        return reducerObj;
      };
      break;
  }

  const allCapUnderscoreChannelVar = `SET_${allCapsUnderscore(
    localChannelVar
  )}`;

  HANDLERS[Types[allCapUnderscoreChannelVar]] = reducerFunction;
}

export default createReducer(INITIAL_STATE, HANDLERS);
