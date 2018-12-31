export default function unpublishStream(agoraClient, localStream) {
  return new Promise((resolve, reject) => {
    agoraClient.unpublish(localStream, function(err) {
      if (err) {
        console.error("ERROR UNPUBLISHING STREAM");
        reject(err);
      }
      resolve();
    });
  });
}
