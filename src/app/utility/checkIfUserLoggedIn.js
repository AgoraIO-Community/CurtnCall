import Auth from "@aws-amplify/auth";
import store from "../store";

import loginToFacebook from "./loginToFacebook";

export default async function checkIfUserLoggedIn() {
  const {
    general: { loginService }
  } = store.getState();

  const currentUser = await Auth.currentUserInfo();

  if (currentUser) return true;

  if (loginService === "facebook") {
    const loggedIntoFacebook = loginToFacebook();
    return loggedIntoFacebook;
  }

  if (loginService === "cognito") {
    const loginModalTrigger = document.getElementById(
      "login-button-modal-trigger"
    );
    loginModalTrigger.click();
    return false;
  }
}
