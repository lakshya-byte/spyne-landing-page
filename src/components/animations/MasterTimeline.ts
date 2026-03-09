import { scrollStore } from "@/hooks/useScrollTimeline";

export const MasterTimeline = {
    subscribe: scrollStore.subscribe.bind(scrollStore),
    get progress() {
        return scrollStore.progress;
    }
};
