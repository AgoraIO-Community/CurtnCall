import { createActions } from "reduxsauce";

let actionObj = {};

actionObj["setLocalCognitoIdentityId"] = ["localCognitoIdentityId"];
actionObj["setIotClient"] = ["iotClient"];

const { Types, Creators } = createActions(actionObj, {});

export { Types, Creators };
