import Auth from "@aws-amplify/auth";

export default async function checkIfIsAdmin() {
  let isAdmin = false;
  try {
    const session = await Auth.currentSession();
    const sessionInfo = session.getIdToken().decodePayload();

    const cognitoGroups = sessionInfo["cognito:groups"];

    console.log("cognitoGroups", cognitoGroups);

    for (let i = 0; i < cognitoGroups.length; i++) {
      if (cognitoGroups[i] === process.env["REACT_APP_ADMIN_GROUP_NAME"]) {
        isAdmin = true;
        break;
      }
    }
    return isAdmin;
  } catch (e) {
    return isAdmin;
  }
}
