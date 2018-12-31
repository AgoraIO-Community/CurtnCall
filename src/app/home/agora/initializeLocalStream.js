export default function initializeLocalStream(localStream) {
  return new Promise((resolve, reject) => {
    localStream.init(
      function() {
        resolve();
      },
      function(err) {
        console.error("ERROR INITIALIZING LOCAL STREAM", err);

        reject(err);
      }
    );
  });
}
