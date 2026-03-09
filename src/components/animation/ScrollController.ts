"use client";

import gsap from "gsap";
import { MasterTimeline } from "@/components/animations/MasterTimeline";

/**
 * ScrollController - The global choreography engine
 * 
 * Purpose:
 * Maps the user's scroll progress (0..10) into discrete animation stages for the Car,
 * Camera, and Lighting sweeps. It functions as the central nervous system for the 3D experience.
 * 
 * Interactions:
 * - Subscribes to the global `MasterTimeline`.
 * - Mutates the exported `scrollState` singleton.
 * - Sub-components (`CameraRig`, `CarChoreography`) read from `scrollState` on `useFrame`.
 * 
 * Performance Considerations:
 * - Avoids React state completely. The 60+ Hz updates are written directly to a standard
 *   Javascript object (`scrollState`), allowing React components to read without re-rendering.
 * - Utilizes optimized Lerp calculations over expensive GSAP timelines for the 3D transforms.
 * 
 * Responsibilities:
 * - Define fixed waypoints (`Stages`) for key moments in the scroll journey.
 * - Calculate micro-movements (drifting, floating) across all frames.
 */

type CarPose = {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
};

type CameraPose = {
  x: number;
  y: number;
  z: number;
  tx: number;
  ty: number;
  tz: number;
};

type ScrollState = {
  car: CarPose;
  camera: CameraPose;
  lightSweepX: number;
};

export const scrollState: ScrollState = {
  car: { x: 0, y: -0.6, z: 0, rx: 0, ry: 0, rz: 0 },
  camera: { x: 4, y: 2, z: 6, tx: 0, ty: 0.5, tz: 0 },
  lightSweepX: -8,
};

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(t: number) {
  return Math.min(Math.max(t, 0), 1);
}

function getScrollSegmentProgress(segmentIndex: number, progress: number) {
  return clamp01(progress - segmentIndex);
}

export function initScrollController() {
  const ease = gsap.parseEase("power3.inOut");

  return MasterTimeline.subscribe((progress) => {
    // MasterTimeline emits progress in the 0..10 range (entire page scroll).
    // Our choreography is authored as 5 stages across segments 0..4.
    // Remap 0..10 -> 0..4 so the full choreography spans the entire scroll.
    const stageProgress = (progress / 10) * 4;

    const s1 = ease(getScrollSegmentProgress(1, stageProgress));
    const s2 = ease(getScrollSegmentProgress(2, stageProgress));
    const s3 = ease(getScrollSegmentProgress(3, stageProgress));
    const s4 = ease(getScrollSegmentProgress(4, stageProgress));

    // --- Stage 1: platform intro (baseline)
    const baseCar: CarPose = { x: 0, y: -0.75, z: 0.2, rx: 0.01, ry: degToRad(-20), rz: 0 };
    const baseCam: CameraPose = { x: 4.3, y: 2.05, z: 6.4, tx: 0, ty: 0.45, tz: 0 };

    // --- Stage 2: lift off
    // y: -1.2 -> 0.5
    // rx: 0 -> -0.05
    // ry: 0 -> 25deg
    // cam z: 6 -> 5
    const liftCar: CarPose = {
      x: lerp(baseCar.x, -0.35, s1),
      y: lerp(baseCar.y, -0.05, s1),
      z: lerp(baseCar.z, -0.25, s1),
      rx: lerp(baseCar.rx, -0.06, s1),
      ry: lerp(baseCar.ry, degToRad(80), s1),
      rz: lerp(baseCar.rz, 0.04, s1),
    };
    const liftCam: CameraPose = {
      ...baseCam,
      x: lerp(baseCam.x, 3.6, s1),
      y: lerp(baseCam.y, 1.9, s1),
      z: lerp(baseCam.z, 5.4, s1),
      ty: lerp(baseCam.ty, 0.55, s1),
    };

    // --- Stage 3: floating reveal
    // x: 0 -> 0.6, y: 0.5 -> 1.2, z: 0 -> -0.8
    // ry: 25 -> 120, rz: 0 -> 0.08
    const floatCar: CarPose = {
      x: lerp(liftCar.x, 0.9, s2),
      y: lerp(liftCar.y, 0.35, s2),
      z: lerp(liftCar.z, -1.25, s2),
      rx: lerp(liftCar.rx, -0.025, s2),
      ry: lerp(liftCar.ry, degToRad(170), s2),
      rz: lerp(liftCar.rz, 0.08, s2),
    };
    const floatCam: CameraPose = {
      ...liftCam,
      x: lerp(liftCam.x, 2.6, s2),
      y: lerp(liftCam.y, 1.75, s2),
      z: lerp(liftCam.z, 4.6, s2),
      tx: lerp(0, 0.05, s2),
      ty: lerp(liftCam.ty, 0.6, s2),
      tz: lerp(0, -0.75, s2),
    };

    // --- Stage 4: hero motion
    // x: 0.6 -> 0, y: 1.2 -> 0.9, z: -0.8 -> -1.2
    // ry: 120 -> 180
    // cam: [4,2,6] -> [2,1.6,4] (we blend from floatCam into target)
    const heroCar: CarPose = {
      x: lerp(floatCar.x, -0.45, s3),
      y: lerp(floatCar.y, 0.15, s3),
      z: lerp(floatCar.z, -0.85, s3),
      rx: lerp(floatCar.rx, -0.035, s3),
      ry: lerp(floatCar.ry, degToRad(250), s3),
      rz: lerp(floatCar.rz, -0.03, s3),
    };
    const heroCam: CameraPose = {
      x: lerp(floatCam.x, 1.9, s3),
      y: lerp(floatCam.y, 1.55, s3),
      z: lerp(floatCam.z, 4.15, s3),
      tx: lerp(floatCam.tx, 0, s3),
      ty: lerp(floatCam.ty, 0.62, s3),
      tz: lerp(floatCam.tz, -0.55, s3),
    };

    // --- Stage 5: final hero pose
    // pos [0, 0.6, -1.4], ry: 200deg, slight forward tilt
    const finalCar: CarPose = {
      x: lerp(heroCar.x, 0.15, s4),
      y: lerp(heroCar.y, -0.05, s4),
      z: lerp(heroCar.z, -1.05, s4),
      rx: lerp(heroCar.rx, -0.055, s4),
      ry: lerp(heroCar.ry, degToRad(310), s4),
      rz: lerp(heroCar.rz, 0.02, s4),
    };
    const finalCam: CameraPose = {
      x: lerp(heroCam.x, 2.05, s4),
      y: lerp(heroCam.y, 1.62, s4),
      z: lerp(heroCam.z, 4.25, s4),
      tx: lerp(heroCam.tx, 0.05, s4),
      ty: lerp(heroCam.ty, 0.6, s4),
      tz: lerp(heroCam.tz, -0.95, s4),
    };

    // Secondary motion (cheap): subtle idle + micro orbit. Keep it across the whole scroll.
    const drift = (progress / 10) * Math.PI * 2;
    const microX = Math.sin(drift * 1.1) * 0.06;
    const microZ = Math.cos(drift * 0.9) * 0.08;
    const microY = Math.sin(drift * 1.4) * 0.025;
    const microYaw = Math.sin(drift * 0.5) * degToRad(2.2);
    const microRoll = Math.cos(drift * 0.7) * 0.012;

    scrollState.car = {
      ...finalCar,
      x: finalCar.x + microX,
      y: finalCar.y + microY,
      z: finalCar.z + microZ,
      ry: finalCar.ry + microYaw,
      rz: finalCar.rz + microRoll,
    };
    scrollState.camera = {
      ...finalCam,
      x: finalCam.x + Math.sin(drift * 0.6) * 0.04,
      y: finalCam.y + Math.cos(drift * 0.8) * 0.02,
    };

    // Light sweep panel X: -8 -> 8 over stages 2..4 (segment 1..3)
    const sweepT = clamp01((progress - 1) / 3);
    scrollState.lightSweepX = lerp(-8, 8, ease(sweepT));
  });
}
