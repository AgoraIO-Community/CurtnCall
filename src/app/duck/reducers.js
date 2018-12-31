import { createReducer } from "reduxsauce";
import { Types } from "./actions";

const INITIAL_STATE = {
  localCognitoIdentityId: null,
  iotClient: null
};
let HANDLERS = {};

const setLocalCognitoIdenityId = (state = INITIAL_STATE, action) => {
  let reducerObj = { ...state };

  reducerObj["localCognitoIdentityId"] = action["localCognitoIdentityId"];

  return reducerObj;
};

const setIotClient = (state = INITIAL_STATE, action) => {
  let reducerObj = { ...state };

  reducerObj["iotClient"] = action["iotClient"];

  return reducerObj;
};

HANDLERS[Types["SET_LOCAL_COGNITO_IDENTITY_ID"]] = setLocalCognitoIdenityId;
HANDLERS[Types["SET_IOT_CLIENT"]] = setIotClient;

export default createReducer(INITIAL_STATE, HANDLERS);
