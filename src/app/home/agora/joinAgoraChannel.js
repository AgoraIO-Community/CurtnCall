export default function joinAgoraChannel(
  agoraClient,
  channelName,
  agoraAccessToken,
  agoraId = null
) {
  return new Promise((resolve, reject) => {
    agoraClient.join(
      agoraAccessToken, //TODO: for now can pass null but eventually security key - https://docs.agora.io/en/2.3.1/product/Interactive%20Broadcast/Agora%20Platform/key_web
      channelName,
      agoraId, //allow agora to set their agoraID by passing null but can pass our own option
      function(testAgoraId) {
        resolve();
      },
      function(err) {
        console.error("client join failed ", err);
        reject(err);
      }
    );
  });
}
