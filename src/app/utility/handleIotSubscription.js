import Auth from "@aws-amplify/auth";
import { iotMessageHandler } from "./";
const Core = require("@aws-amplify/core");
const Paho = require("paho-mqtt");

export default async function handleIotSubscription(clientId, channelName) {
  try {
    const credentials = await Auth.currentCredentials();

    return new Promise((resolve, reject) => {
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
      iotClient.onMessageArrived = iotMessageHandler;
      iotClient.onConnectionLost = onConnectionLost;

      iotClient.connect({
        reconnect: true,
        useSSL: true,
        mqttVersion: 3,
        onSuccess: function() {
          iotClient.subscribe(clientId);
          iotClient.subscribe(channelName);

          resolve(iotClient);
        },
        onFailure: function(error) {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.log("error", error);
  }
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

// import PubSub from "@aws-amplify/pubsub";
// import { iotMessageHandler } from "./";

// export default function handleIotSubscription(
//   iotClient,
//   channelName,
//   iotId,
//   shouldWeSubscribe
// ) {
//   if (shouldWeSubscribe) {
//     iotClient.subscribe(channelName);
//     iotClient.subscribe(iotId);
//   } else {
//     iotClient.unsubscribe(channelName);
//     iotClient.unsubscribe(iotId);
//   }

//   return;

//   // const subscribeTopics = [channelName];

//   // subscribeTopics.push(iotId);

//   // const iotSubscription = PubSub.subscribe(subscribeTopics).subscribe({
//   //   next: data => {
//   //     if (iotMessageHandler) iotMessageHandler(data);
//   //   },
//   //   error: error => {
//   //     alert("IOT ERROR");

//   //     console.error(error);
//   //     debugger;
//   //   },
//   //   close: () => {
//   //     console.log("IOT is unsubscribed");
//   //   }
//   // });

//   // return iotSubscription;
// }
