import client from "../client";
import { sendClientError } from "../common/graphql";

export default async function sendClientError(functionName, message) {
  await client.mutate({
    mutation: sendClientError,
    variables: {
      functionName,
      message
    }
  });
  return;
}
