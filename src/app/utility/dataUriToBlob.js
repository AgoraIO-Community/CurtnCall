export default function dataUriToBlob(dataUri) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataUri.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataUri.split(",")[1]);
  else byteString = unescape(dataUri.split(",")[1]);

  // separate out the mime component
  var mimeString = dataUri
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}
