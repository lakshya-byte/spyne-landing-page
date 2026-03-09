"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLenisScroll } from "./useLenisScroll";

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
    const lenisRef = useLenisScroll({ lerp: 0.08 });

    useLayoutEffect(() => {
        gsap.ticker.lagSmoothing(0);

        const lenis = lenisRef.current;
        if (lenis) {
            ScrollTrigger.scrollerProxy(document.documentElement, {
                scrollTop(value) {
                    if (typeof value === "number") {
                        lenis.scrollTo(value, { immediate: true });
                    }
                    return window.scrollY || document.documentElement.scrollTop;
                },
                getBoundingClientRect() {
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight,
                    };
                },
            });

            lenis.on("scroll", () => {
                ScrollTrigger.update();
            });

            ScrollTrigger.addEventListener("refresh", () => lenis.resize());
        }

        const ctx = gsap.context(() => {
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

        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.removeEventListener("refresh", () => lenis?.resize());
            ctx.revert();
        };
    }, [lenisRef]);
}
