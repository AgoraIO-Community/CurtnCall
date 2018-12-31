import AgoraRTC from "agora-rtc-sdk";

export default function checkIfUserHasCameraAndMic() {
  return new Promise((resolve, reject) => {
    let audioDevice = false;
    let videoDevice = false;
    AgoraRTC.getDevices((devices, err) => {
      if (err) {
        console.log("getDevices error", err);
        reject(err);
      }

      for (let i = 0; i !== devices.length; i++) {
        const device = devices[i];

        if (audioDevice && videoDevice) {
          resolve(true);
        }

        if (device.kind === "audioinput") {
          audioDevice = true;
        }

        if (device.kind === "videoinput") {
          videoDevice = true;
        }
      }
      resolve(false);
    });
  });
}
