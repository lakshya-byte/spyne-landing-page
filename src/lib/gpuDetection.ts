import { getGPUTier } from "detect-gpu";

/**
 * Returns the detected GPU tier (1, 2, or 3).
 * Defaults to 3 (highest) if detection fails or hasn't run.
 */
export async function detectGPUTier(): Promise<number> {
    try {
        const gpuTier = await getGPUTier();
        // getGPUTier typically returns tiers 1 to 3
        if (gpuTier && typeof gpuTier.tier === 'number') {
            return gpuTier.tier;
        }
        return 3;
    } catch (error) {
        console.error("GPU Detection failed, defaulting to tier 3", error);
        return 3;
    }
}
