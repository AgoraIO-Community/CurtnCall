import { createActions } from "reduxsauce";
import { capitalize } from "../../utility";
import { localChannelVars, serverChannelVars } from "../../utility/vars";

let actionObj = {};

for (let i = 0; i < serverChannelVars.length; i++) {
  const serverChannelVar = serverChannelVars[i];

  actionObj[`set${capitalize(serverChannelVar)}`] = [serverChannelVar];
}

for (let i = 0; i < localChannelVars.length; i++) {
  const localChannelVar = localChannelVars[i];

  actionObj[`set${capitalize(localChannelVar)}`] = [localChannelVar];
}

actionObj["setChannelToInitialState"] = [""];

const { Types, Creators } = createActions(actionObj, {});

export { Types, Creators };
