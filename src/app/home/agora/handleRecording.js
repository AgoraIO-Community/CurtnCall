import { handleRecordData } from "./";
import Storage from "@aws-amplify/storage";
import { dataUriToBlob } from "../../utility";
import { ImageCapture } from "../../utility/imagecapture";

export default async function handleRecording(
  stream,
  performanceId,
  setPerformanceUploadProgress
) {
  window.recordedBlobs = [];
  let options = { mimeType: "video/webm;codecs=h264" };

  try {
    //Grab still photo, send to S3
    let canvas = document.getElementById("performer-canvas");
    const videoDevice = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(videoDevice);
    const bitmap = await imageCapture.grabFrame();
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    canvas.getContext("2d").drawImage(bitmap, 0, 0);
    const canvasToDataUrl = canvas.toDataURL();
    const blob = dataUriToBlob(canvasToDataUrl);
    const photoFile = new File([blob], "performance.png");
    Storage.put(`${performanceId}.png`, photoFile, {
      contentType: "image/png"
    });

    //Start recording video
    window.mediaRecorder = new MediaRecorder(stream, options);
    window.mediaRecorder.ondataavailable = handleRecordData;
    window.mediaRecorder.start(10); // collect 10ms of data

    //Send recording to S3 on stop recording
    window.mediaRecorder.onstop = async e => {
      const blob = new Blob(window.recordedBlobs, {
        type: "video/webm"
      });

      const file = new File([blob], "performance.webm");

      await Storage.put(`${performanceId}.webm`, file, {
        contentType: "video/webm",
        progressCallback: function(progress) {
          const { loaded, total } = progress;

          const performanceUploadProgress = Math.ceil((loaded / total) * 100);
          setPerformanceUploadProgress(performanceUploadProgress);

          if (performanceUploadProgress === 100) {
            setTimeout(() => {
              setPerformanceUploadProgress(null);
            }, 3000);
          }
        }
      });
    };
  } catch (e) {
    console.error(`Exception while creating MediaRecorder: ${e}`);

    return;
  }

  return;
}
