"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Global store for scroll progress (0 to 10)
export const scrollStore = {
    progress: 0,
    listeners: new Set<(p: number) => void>(),
    subscribe(fn: (p: number) => void): () => void {
        this.listeners.add(fn);
        return () => { this.listeners.delete(fn); };
    },
    setProgress(p: number) {
        this.progress = p;
        this.listeners.forEach((fn) => fn(p));
    }
};

export function useScrollTimeline() {
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: "#scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Smooth scrub
                onUpdate: (self) => {
                    // Normalize to 0-10 segments
                    const progress = self.progress * 10;
                    scrollStore.setProgress(progress);
                }
            });
        });
        return () => ctx.revert();
    }, []);
}
