import Auth from "@aws-amplify/auth";
import client from "../client";
import { addUserToDb, addAuthenticatedIdToViewer } from "../common/graphql";
import store from "../store";
import { getChannelName } from "./";

export default async function(data) {
  const { accessToken: token, expiresIn } = data;

  const state = store.getState();

  const channelName = getChannelName(state.router);

  let unauthenticatedCognitoIdentityId;

  try {
    const currentCredentials = await Auth.currentCredentials();
    unauthenticatedCognitoIdentityId = currentCredentials._identityId;

    const expires_at = expiresIn * 1000 + new Date().getTime();

    const user = await getUserInfo();

    const { name, email, facebookId } = user;

    await Auth.federatedSignIn("facebook", { token, expires_at }, user);

    const { id: cognitoIdentityId } = await Auth.currentUserInfo();

    await client.mutate({
      mutation: addUserToDb,
      variables: {
        name,
        email,
        cognitoIdentityId,
        facebookId
      }
    });

    await client.mutate({
      mutation: addAuthenticatedIdToViewer,
      variables: {
        channelName,
        unauthenticatedCognitoIdentityId
      }
    });
  } catch (error) {
    console.log("error", error);
    await Auth.signOut();
    return;
  }
}

function getUserInfo() {
  return new Promise((res, rej) => {
    window.FB.api("/me", { fields: "name,email" }, response => {
      const returnObj = {
        email: response.email,
        name: response.name,
        facebookId: response.id,
        picture: `https://graph.facebook.com/${response.id}/picture/?type=large`
      };

      res(returnObj);
    });
  });
}
