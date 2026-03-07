import { useState, useEffect } from "react";
import { detectGPUTier } from "@/lib/gpuDetection";

export function useGPUPerformance() {
    const [tier, setTier] = useState<number>(3); // Default to high

    useEffect(() => {
        let mounted = true;
        detectGPUTier().then((t) => {
            if (mounted) setTier(t);
        });
        return () => { mounted = false; };
    }, []);

    return tier;
}
