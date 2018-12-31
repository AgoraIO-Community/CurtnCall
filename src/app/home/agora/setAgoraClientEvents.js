import store from "../../store";
import { Creators as homeCreators } from "../duck/actions";

export default async function setAgoraClientEvents(agoraClient) {
  agoraClient.on("stream-added", function thisIsMyFunction(evt) {
    const {
      home: { userIsCurrentPerformer }
    } = store.getState();

    if (userIsCurrentPerformer) {
      return;
    }

    const stream = evt.stream;

    agoraClient.subscribe(stream, function(err) {
      console.log("Subscribe stream failed", err);
    });
  });

  agoraClient.on("stream-subscribed", function(evt) {
    const stream = evt.stream;

    const setViewerStream = homeCreators["setViewerStream"];

    store.dispatch(setViewerStream(stream.stream));
  });

  agoraClient.on("error", function(err) {
    console.log("Got Agora error msg:", err.reason);
  });
}
