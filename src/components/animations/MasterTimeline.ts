import { scrollStore } from "@/hooks/useScrollTimeline";

/**
 * Helper to get progress securely clamped to a specific segment.
 * E.g. segment 0 represents progress from 0 to 1.
 * segment 1 is 1 to 2, etc.
 * Returns 0 to 1 representing completion of that specific segment.
 */
export function getSegmentProgress(segmentIndex: number, currentProgress: number): number {
    const localProgress = currentProgress - segmentIndex;
    return Math.min(Math.max(localProgress, 0), 1);
}

export const MasterTimeline = {
    subscribe: scrollStore.subscribe.bind(scrollStore),
    get progress() {
        return scrollStore.progress;
    }
};
