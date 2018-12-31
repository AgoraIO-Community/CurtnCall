import Auth from "@aws-amplify/auth";
// import store from "../store";
import { Creators as generalCreators } from "../duck/actions";
const Core = require("@aws-amplify/core");
const Paho = require("paho-mqtt");

export default async function setupIotClient(clientId, store) {
  try {
    const credentials = await Auth.currentCredentials();
    const region = process.env.REACT_APP_REGION;
    const endpoint = process.env.REACT_APP_PUB_SUB_ENDPOINT;

    const url = Core.Signer.signUrl(
      endpoint,
      {
        access_key: credentials.accessKeyId,
        secret_key: credentials.secretAccessKey,
        session_token: credentials.sessionToken
      },
      { region, service: "iotdevicegateway" }
    );

    const iotClient = new Paho.Client(url, clientId);

    iotClient.connect({
      reconnect: true,
      useSSL: true,
      mqttVersion: 3,
      onSuccess: function() {
        const iotFunctionToCall = generalCreators["setIotClient"];

        console.log("store", store);

        store.dispatch(iotFunctionToCall(iotClient));
        return;
      },
      onFailure: function(error) {
        console.log("error", error);
      }
    });
  } catch (error) {
    console.log("error", error);
  }
}
