import Auth from "@aws-amplify/auth";
import store from "../store";

export default async function getCurrentUserNameAndPicture() {
  const {
    general: { loginService }
  } = store.getState();

  let name, picture;

  if (loginService === "facebook") {
    const user = await Auth.currentAuthenticatedUser();
    name = user.name;
    picture = user.picture;
  }
  if (loginService === "cognito") {
    const {
      attributes: { family_name, given_name }
    } = await Auth.currentAuthenticatedUser();
    name = `${given_name} ${family_name}`;
    picture = "/";
  }

  return { name, picture };
}
