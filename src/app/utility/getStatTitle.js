import { capitalize } from "./";

export default function getStatTitle(category) {
  let returnValue = "";
  switch (category) {
    case "compellingScore":
      returnValue = "Compelling Score";
      break;
    case "controversialScore":
      returnValue = "Controversial Score";
      break;
    case "numberOfPerformances":
      returnValue = "Performances";
      break;
    case "performanceTime":
      returnValue = "Performance Time";
      break;
    case "viewingTime":
      returnValue = "Viewing Time";
      break;
    case "viewerScore":
      returnValue = "Viewer Score";
      break;
    case "zzz":
      returnValue = "ZZZ";
      break;
    default:
      returnValue = capitalize(category);
      break;
  }

  return returnValue;
}
