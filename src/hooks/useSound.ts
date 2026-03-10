"use client";

import { useEffect, useState, useCallback } from "react";
import { Howl, Howler } from "howler";

// Local sound assets from public directory
const SOUND_ASSETS = {
    startup: "/penguinmusic-lazy-day-stylish-futuristic-chill-239287 (1).mp3",
    click: "/penguinmusic-lazy-day-stylish-futuristic-chill-239287 (1).mp3",
    ambient: "/penguinmusic-lazy-day-stylish-futuristic-chill-239287 (1).mp3",
};

// Singleton storage for audio instances
let globalSounds: Record<keyof typeof SOUND_ASSETS, Howl> | null = null;

// Global state tracking for UI sync
let globalIsAmbientPlaying = false;
const playingSubscribers = new Set<(playing: boolean) => void>();

function notifySubscribers() {
    playingSubscribers.forEach((fn) => fn(globalIsAmbientPlaying));
}

function initSounds() {
    if (typeof window === "undefined" || globalSounds) return;

    // Initialize global audio instances
    globalSounds = {
        startup: new Howl({ src: [SOUND_ASSETS.startup], volume: 0.5 }),
        click: new Howl({ src: [SOUND_ASSETS.click], volume: 0.2 }),
        ambient: new Howl({
            src: [SOUND_ASSETS.ambient],
            loop: true,
            volume: 0.1,
            autoplay: true, // Will attempt to autoplay, fallback to first-interaction unlock natively via Howler
            onplay: () => {
                globalIsAmbientPlaying = true;
                notifySubscribers();
            },
            onpause: () => {
                globalIsAmbientPlaying = false;
                notifySubscribers();
            },
            onstop: () => {
                globalIsAmbientPlaying = false;
                notifySubscribers();
            },
            onend: () => {
                // Should loop, but just in case
                if (!globalSounds?.ambient.loop()) {
                    globalIsAmbientPlaying = false;
                    notifySubscribers();
                }
            }
        }),
    };

    // Check if autoplay succeeded immediately
    if (globalSounds.ambient.playing()) {
        globalIsAmbientPlaying = true;
        notifySubscribers();
    }
}

/**
 * Custom hook for managing audio playback throughout the application
 */
export function useSound() {
    const [isAmbientPlaying, setIsAmbientPlaying] = useState(globalIsAmbientPlaying);

    useEffect(() => {
        initSounds();

        // Sync state across components
        const handleStateChange = (playing: boolean) => setIsAmbientPlaying(playing);
        playingSubscribers.add(handleStateChange);

        // Immediately trigger with current state in case it started before mount
        handleStateChange(globalIsAmbientPlaying);

        return () => {
            playingSubscribers.delete(handleStateChange);
        };
    }, []);

    const playSound = useCallback((name: keyof typeof SOUND_ASSETS) => {
        if (!globalSounds) initSounds();
        if (globalSounds?.[name] && !globalSounds[name].playing()) {
            globalSounds[name].play();
        }
    }, []);

    const pauseSound = useCallback((name: keyof typeof SOUND_ASSETS) => {
        if (!globalSounds) return;
        if (globalSounds?.[name] && globalSounds[name].playing()) {
            globalSounds[name].pause();
        }
    }, []);

    return { playSound, pauseSound, isAmbientPlaying };
}
