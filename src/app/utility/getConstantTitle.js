import { capitalize } from "./";

export default function getConstantTitle(constant) {
  let returnValue = "";
  switch (constant) {
    case "compellingScore":
      returnValue = "Compelling Score";
      break;
    case "controversialScore":
      returnValue = "Controversial Score";
      break;
    case "gimmeMoreDuration":
      returnValue = "Gimme More Duration";
      break;
    case "maxNumberOfPerformance":
      returnValue = "Max Number of Performances";
      break;
    case "performanceDuration":
      returnValue = "Performance Duration";
      break;
    case "performanceReadyThreshold":
      returnValue = "Performance Ready Threshold";
      break;
    case "performanceTime":
      returnValue = "Performance Time";
      break;
    case "performanceTimerExpiredThreshold":
      returnValue = "Performance Timer Expired Threshold";
      break;
    case "pullThePlugThreshold":
      returnValue = "Pull the Plug Threshold";
      break;
    case "reactionTimeout":
      returnValue = "Reaction Timeout";
      break;
    case "showDescription":
      returnValue = "Show Description";
      break;
    case "showName":
      returnValue = "Show Name";
      break;
    case "viewingTime":
      returnValue = "Viewing Time";
      break;
    case "viewerScore":
      returnValue = "Viewer Score";
      break;
    case "votingDuration":
      returnValue = "Voting Duration";
      break;
    case "votingTimerExpiredThreshold":
      returnValue = "Voting Timer Expired Threshold";
      break;
    case "zzz":
      returnValue = "ZZZ";
      break;
    default:
      returnValue = capitalize(constant);
      break;
  }

  return returnValue;
}
