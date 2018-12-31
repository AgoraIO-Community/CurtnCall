export default function getSocialMediaColor(type) {
  const socialMediaColor = {
    facebook: "#3b5998",
    twitter: "#00aced",
    youtube: "#ff0000"
  };

  return socialMediaColor[`${type}`];
}
