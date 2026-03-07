"use client";

import { useEffect, useRef } from "react";
import { Howl, Howler } from "howler";

// Example sound URLs, in a real app these would be public assets
const SOUND_ASSETS = {
    startup: "https://assets.mixkit.co/active_storage/sfx/1569/1569-preview.mp3",
    click: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
    ambient: "https://assets.mixkit.co/active_storage/sfx/265/265-preview.mp3",
};

export function useSound() {
    const sounds = useRef<{ [key: string]: Howl }>({});

    useEffect(() => {
        sounds.current = {
            startup: new Howl({ src: [SOUND_ASSETS.startup], volume: 0.5 }),
            click: new Howl({ src: [SOUND_ASSETS.click], volume: 0.2 }),
            ambient: new Howl({ src: [SOUND_ASSETS.ambient], loop: true, volume: 0.1 }),
        };

        return () => {
            Howler.unload();
        };
    }, []);

    const playSound = (name: keyof typeof SOUND_ASSETS) => {
        if (sounds.current[name]) {
            sounds.current[name].play();
        }
    };

    return { playSound };
}
