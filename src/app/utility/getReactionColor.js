import theme from "../theme";

export default function getReactionColor(reaction) {
  const reactionColor = {
    applause: theme.color.darkGreen,
    laugh: theme.color.darkYellow,
    sad: theme.color.darkBlue,
    hearts: theme.color.darkPink,
    shock: theme.color.darkOrange,
    awkward: theme.color.darkGrey,
    angry: theme.color.darkRed,
    confused: theme.color.darkTeal
  };

  return reactionColor[`${reaction}`];
}
