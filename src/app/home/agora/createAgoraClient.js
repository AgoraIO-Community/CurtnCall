import AgoraRTC from "agora-rtc-sdk";

export default function createAgoraClient(appId) {
  const agoraClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

  return new Promise((resolve, reject) => {
    agoraClient.init(
      appId,
      function() {
        resolve(agoraClient);
      },
      function(err) {
        console.error("ERROR CREATING AGORA CLIENT", err);

        reject(err);
      }
    );
  });
}
