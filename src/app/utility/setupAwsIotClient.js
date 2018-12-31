// import Amplify from "@aws-amplify/core";
// import Auth from "@aws-amplify/auth";
// import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";
// import IoT from "aws-sdk/clients/iot";

// async function getCurrentCredentials() {
//   return await Auth.currentCredentials();
// }

// async function prepareIot(iotId) {
//   const credentials = await getCurrentCredentials();
//   const authenticatedUser = await Auth.currentUserInfo();
//   if (authenticatedUser) {
//     await attachIotPolicy(credentials);
//   }
//   await addIotToAmplify(iotId, credentials);
//   return;
// }

// async function attachIotPolicy(credentials) {
//   const iot = new IoT({
//     region: process.env.REACT_APP_REGION,
//     credentials
//   });

//   const policyName = process.env.REACT_APP_IOT_POLICY;
//   const target = credentials._identityId;
//   const { policies } = await iot.listAttachedPolicies({ target }).promise();

//   if (!policies.find(policy => policy.policyName === policyName)) {
//     return await iot.attachPolicy({ policyName, target }).promise();
//   }
// }

// async function addIotToAmplify(iotId, credentials) {
//   console.log("credentials", credentials);

//   // const urlSigner = createUrlSigner(
//   //   "us-east-1",
//   //   "a2yxaiy52vekg2-ats.iot.us-east-1.amazonaws.com",
//   //   credentials
//   // );

//   console.log("urlSigner", urlSigner);

//   // const client = AWSMqtt.connect({
//   //   WebSocket: window.WebSocket,
//   //   region: "us-east-1",
//   //   credentials,
//   //   endpoint: "a2yxaiy52vekg2-ats.iot.us-east-1.amazonaws.com", // NOTE: get this value with `aws iot describe-endpoint`
//   //   clientId: iotId, // clientId to register with MQTT broker. Need to be unique per client
//   //   will: {
//   //     topic: "WillMsg",
//   //     payload: "Connection Closed abnormally..!",
//   //     qos: 0,
//   //     retain: false
//   //   }
//   // });

//   // client.on("error", error => {
//   //   console.log("error", error);
//   // });

//   // client.on("connect", () => {
//   //   console.log("connected to iot!!!");
//   //   // client.subscribe('/myTopic')
//   // });
//   // client.on('message', (topic, message) => {
//   //   console.log(topic, message)
//   // })
//   // client.on('close', () => {
//   //   // ...
//   // })
//   // client.on('offline', () => {
//   //   // ...
//   // })

//   // await Amplify.addPluggable(
//   //   new AWSIoTProvider({
//   //     aws_pubsub_region: process.env.REACT_APP_REGION,
//   //     aws_pubsub_endpoint: process.env.REACT_APP_PUB_SUB_ENDPOINT,
//   //     clientId: iotId,
//   //     credentials,
//   //     onDisconnect: function(arg1, arg2, arg3) {
//   //       console.log("arg1", arg1);
//   //       console.log("arg2", arg2);
//   //       console.log("arg3", arg3);
//   //       alert("IOT TIMED OUT!!!");
//   //     }
//   //   })
//   // );

//   return;
// }

// function createUrlSigner({ region, endpoint, credentials }) {
//   const sign = ({ credentials, expiration }) => {
//     let url = v4.createPresignedURL(
//       "GET",
//       endpoint,
//       "/mqtt",
//       "iotdevicegateway",
//       crypto
//         .createHash("sha256")
//         .update("", "utf8")
//         .digest("hex"),
//       {
//         key: credentials.accessKeyId,
//         secret: credentials.secretAccessKey,
//         region,
//         expiration,
//         protocol: "wss"
//       }
//     );
//     if (credentials.sessionToken) {
//       url +=
//         "&X-Amz-Security-Token=" + encodeURIComponent(credentials.sessionToken);
//     }

//     console.log("url", url);

//     return url;
//   };

//   const expiration = 6000;

//   // const url = sign({ credentials, expiration });

//   console.log("url", url);
//   return url;
// }

// export default async function setupAwsIotClient(iotId) {
//   await prepareIot(iotId);
//   return;
// }
