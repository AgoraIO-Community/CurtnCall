import { Creators as homeCreators } from "../duck/actions";
import store from "../../store";
import AgoraRTC from "agora-rtc-sdk";
import { initializeLocalStream } from "./";
import { startPerformer } from "../../common/graphql";

export default async function establishLocalStream(client, channelName, input) {
  const {
    home: { camera, currentPerformer, microphone, showPerformerSidebar }
  } = store.getState();

  const streamID = Math.floor(Math.random() * 0xffffffff);

  const localStream = AgoraRTC.createStream({
    streamID,
    video: true,
    audio: false,
    cameraId: camera,
    microphoneId: microphone,
    screen: false
  });

  localStream.setVideoProfile("480P_8");

  await initializeLocalStream(localStream); //this is where user grants access to local audio/video

  //if they don't grant access they will automatically be returned and the error will be caught in the promise

  store.dispatch(homeCreators.setLocalStream(localStream));
  store.dispatch(homeCreators.setPerformerStream(localStream.stream));

  try {
    await client.mutate({
      mutation: startPerformer,
      variables: {
        channelName,
        input
      }
    });
  } catch (error) {
    console.log("error", error);
    console.log("Establish Local Stream Agora");
  }

  if (!showPerformerSidebar && currentPerformer) {
    store.dispatch(homeCreators.setShowPerformerSidebar());
  }
}
