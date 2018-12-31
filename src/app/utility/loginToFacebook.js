import loginFacebookUserToAmplify from "./loginFacebookUserToAmplify";

export default function loginToFacebook(appId) {
  window.FB.login(checkLoginState, {
    scope: "public_profile,email"
  });
}

function checkLoginState() {
  window.FB.getLoginStatus(statusChangeCallback);
}

async function statusChangeCallback(response) {
  if (response.status === "connected") {
    await loginFacebookUserToAmplify(response.authResponse);
  } else {
    handleError(response);
  }
}

function handleError(error) {
  console.error(error);
}
