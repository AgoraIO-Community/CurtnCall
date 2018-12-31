export default function leaveAgoraChannel(agoraClient) {
  return new Promise((resolve, reject) => {
    agoraClient.leave(
      function() {
        resolve();
      },
      function(err) {
        console.error("client leave failed ", err);
        reject(err);
      }
    );
  });
}
