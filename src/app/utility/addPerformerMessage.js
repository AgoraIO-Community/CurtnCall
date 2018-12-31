import store from "../store";

export default function addPerformerMessage(messageObj) {
  const {
    home: { performerMessages }
  } = store.getState();

  if (performerMessages.length > 9) {
    performerMessages.splice(-1, 1);
    performerMessages.unshift(messageObj);
  } else {
    performerMessages.unshift(messageObj);
  }

  return performerMessages;
}
