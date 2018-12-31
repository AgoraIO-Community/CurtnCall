export default function handleRecordData(event) {
  if (event.data && event.data.size > 0) {
    window.recordedBlobs.push(event.data);
  }
}
