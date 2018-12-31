import Auth from "@aws-amplify/auth";

export default async function getAwsUsername() {
  const currentUserInfo = await Auth.currentUserInfo();
  if (currentUserInfo) {
    return currentUserInfo.username;
  } else {
    return null;
  }
}
