import { getSegmentProgress } from "./MasterTimeline";

export function getLightingIntensities(sceneProgress: number) {
    // Segment 0 -> 1: Startup (dark -> silhoutte)
    const startupProgress = getSegmentProgress(0, sceneProgress);

    // Segment 1 -> 2: Full Reveal
    const revealProgress = getSegmentProgress(1, sceneProgress);

    return {
        keyLight: revealProgress * 3,
        fillLight: revealProgress * 1.5,
        rimLight: Math.max(startupProgress * 4, revealProgress * 4),
        backLight: revealProgress * 2,
    };
}
