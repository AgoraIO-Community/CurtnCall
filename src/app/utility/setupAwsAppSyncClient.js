import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import AWSAppSyncClient from "aws-appsync/lib";
import Auth from "@aws-amplify/auth";

export default async function setupAwsAppSyncClient() {
  const credentials = await Auth.currentCredentials();
  const client = new AWSAppSyncClient({
    url: process.env.REACT_APP_APPSYNC_URL,
    region: process.env.REACT_APP_REGION,
    auth: {
      type: AUTH_TYPE.AWS_IAM,
      credentials
    },
    disableOffline: true
  });

  return client;
}
