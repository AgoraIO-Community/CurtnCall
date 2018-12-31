import { Creators as homeCreators } from "../duck/actions";
import store from "../../store";
import { createAgoraClient, setAgoraClientEvents } from "./";

export default async function establishAgora(channelName) {
  const agoraClient = await createAgoraClient(
    process.env.REACT_APP_AGORA_APP_ID
  );

  await setAgoraClientEvents(agoraClient);

  store.dispatch(homeCreators.setAgoraClient(agoraClient));

  return agoraClient;
}
