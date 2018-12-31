import { Creators as homeCreators } from "../home/duck/actions";
import store from "../store";
import { capitalize, addPerformerMessage, channelSegmentCleanup } from "./";

export default async function iotMessageHandler(value) {
  value = JSON.parse(value.payloadString);

  if ("updateKey" in value) {
    if (value.updateKey === "errorMessage") {
      import("sweetalert").then(swal => {
        swal.default("Ut oh!", value.errorMessage, "error");
      });

      return;
    }

    const iotValue = value[`${value.updateKey}`];
    const iotFunctionToCall = homeCreators[`set${capitalize(value.updateKey)}`];

    store.dispatch(iotFunctionToCall(iotValue));
  } else if ("performerMessage" in value) {
    const performerMessages = addPerformerMessage(value.performerMessage);
    const iotFunctionToCall = homeCreators["setPerformerMessages"];

    store.dispatch(iotFunctionToCall(performerMessages));
  } else if ("reloadBrowser" in value) {
    window.location.reload();
  } else {
    const values = Object.keys(value);

    values.forEach(element => {
      const iotValue = value[`${element}`];
      const iotFunctionToCall = homeCreators[`set${capitalize(element)}`];
      store.dispatch(iotFunctionToCall(iotValue));
    });

    if (value.channelSegment) {
      channelSegmentCleanup(value.channelSegment);
    }
  }
}
