"use client";

/**
 * useSound - Audio management hook for the Spyne landing page
 * 
 * Provides centralized audio control with Howler.js integration:
 * - Startup sounds for user interactions
 * - Click feedback for UI elements
 * - Ambient background music with loop capability
 * - Volume control and sound asset management
 * 
 * Features:
 * - Automatic cleanup on unmount
 * - Local audio asset integration
 * - Type-safe sound playback
 * - Memory-efficient sound management
 */

import { useEffect, useRef } from "react";
import { Howl, Howler } from "howler";

// Local sound assets from public directory
const SOUND_ASSETS = {
    startup: "/penguinmusic-lazy-day-stylish-futuristic-chill-239287 (1).mp3",
    click: "/penguinmusic-lazy-day-stylish-futuristic-chill-239287 (1).mp3",
    ambient: "/penguinmusic-lazy-day-stylish-futuristic-chill-239287 (1).mp3",
};

/**
 * Custom hook for managing audio playback throughout the application
 * 
 * @returns {Object} Audio control interface
 * @returns {Function} playSound - Function to play specific sound by name
 * 
 * @example
 * ```tsx
 * const { playSound } = useSound();
 * playSound("startup"); // Plays startup sound
 * ```
 */
export function useSound() {
    // Ref to store Howl instances for each sound type
    const sounds = useRef<{ [key: string]: Howl }>({});

    // Initialize sound instances on component mount
    useEffect(() => {
        sounds.current = {
            startup: new Howl({ src: [SOUND_ASSETS.startup], volume: 0.5 }),
            click: new Howl({ src: [SOUND_ASSETS.click], volume: 0.2 }),
            ambient: new Howl({ src: [SOUND_ASSETS.ambient], loop: true, volume: 0.1 }),
        };

        // Cleanup function to prevent memory leaks
        return () => {
            Howler.unload();
        };
    }, []);

    /**
     * Play a specific sound by name
     * 
     * @param {keyof typeof SOUND_ASSETS} name - The name of the sound to play
     */
    const playSound = (name: keyof typeof SOUND_ASSETS) => {
        if (sounds.current[name] && !sounds.current[name].playing()) {
            sounds.current[name].play();
        }
    };

    /**
     * Pause a specific sound by name
     * 
     * @param {keyof typeof SOUND_ASSETS} name - The name of the sound to pause
     */
    const pauseSound = (name: keyof typeof SOUND_ASSETS) => {
        if (sounds.current[name] && sounds.current[name].playing()) {
            sounds.current[name].pause();
        }
    };

    return { playSound, pauseSound };
}
