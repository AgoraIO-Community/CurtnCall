import { Creators as homeCreators } from "../home/duck/actions";
import store from "../store";
import { reactions } from "../utility";

export default function(channelSegment) {
  if (channelSegment === "performance") {
    const {
      home: { performanceVote, audiencePulledPlug, adminPulledPlug }
    } = store.getState();

    if (performanceVote) {
      const { setPerformanceVote } = homeCreators;
      store.dispatch(setPerformanceVote(null));
    }

    if (audiencePulledPlug) {
      const { setAudiencePulledPlug } = homeCreators;

      store.dispatch(setAudiencePulledPlug(false));
    }

    if (adminPulledPlug) {
      const { setAdminPulledPlug } = homeCreators;

      store.dispatch(setAdminPulledPlug(false));
    }
  } else if (channelSegment === "voting") {
    const {
      home: {
        performanceId,
        performanceEnd,
        performerMessages,
        performanceReady,
        performanceStart,
        reactionCounts,
        showPerformerSidebar,
        viewerPulledPlug,
        viewerStream
      }
    } = store.getState();

    if (viewerPulledPlug) {
      const { setViewerPulledPlug } = homeCreators;

      store.dispatch(setViewerPulledPlug(false));
    }

    if (showPerformerSidebar) {
      const { setShowPerformerSidebar } = homeCreators;

      store.dispatch(setShowPerformerSidebar(false));
    }

    if (viewerStream) {
      const { setViewerStream } = homeCreators;

      store.dispatch(setViewerStream(null));
    }

    if (performanceReady) {
      const { setPerformanceReady } = homeCreators;

      store.dispatch(setPerformanceReady(false));
    }

    if (performanceId) {
      const { setPerformanceId } = homeCreators;

      store.dispatch(setPerformanceId(null));
    }

    if (performanceStart) {
      const { setPerformanceStart } = homeCreators;

      store.dispatch(setPerformanceStart(null));
    }

    if (performanceEnd) {
      const { setPerformanceEnd } = homeCreators;

      store.dispatch(setPerformanceEnd(null));
    }

    if (performerMessages.length > 0) {
      const { setPerformerMessages } = homeCreators;

      store.dispatch(setPerformerMessages([]));
    }

    if (reactionCounts) {
      const { setReactionCounts } = homeCreators;
      let reactionCounts = {};

      reactions.forEach(reaction => {
        reactionCounts[`${reaction}`] = 0;
      });

      store.dispatch(setReactionCounts(reactionCounts));
    }
  }
}
