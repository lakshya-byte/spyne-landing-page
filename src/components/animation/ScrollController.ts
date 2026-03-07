"use client";

import gsap from "gsap";
import { MasterTimeline } from "@/components/animations/MasterTimeline";

export type CarPose = {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
};

export type CameraPose = {
  x: number;
  y: number;
  z: number;
  tx: number;
  ty: number;
  tz: number;
};

export type ScrollState = {
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

export function getScrollSegmentProgress(segmentIndex: number, progress: number) {
  return clamp01(progress - segmentIndex);
}

export function initScrollController() {
  const ease = gsap.parseEase("power3.inOut");

  return MasterTimeline.subscribe((progress) => {
    // We use 5 stages mapped to segments 0..4.
    const s0 = ease(getScrollSegmentProgress(0, progress));
    const s1 = ease(getScrollSegmentProgress(1, progress));
    const s2 = ease(getScrollSegmentProgress(2, progress));
    const s3 = ease(getScrollSegmentProgress(3, progress));
    const s4 = ease(getScrollSegmentProgress(4, progress));

    // --- Stage 1: platform intro (baseline)
    const baseCar: CarPose = { x: 0, y: -0.6, z: 0, rx: 0, ry: 0, rz: 0 };
    const baseCam: CameraPose = { x: 4, y: 2, z: 6, tx: 0, ty: 0.5, tz: 0 };

    // --- Stage 2: lift off
    // y: -1.2 -> 0.5
    // rx: 0 -> -0.05
    // ry: 0 -> 25deg
    // cam z: 6 -> 5
    const liftCar: CarPose = {
      x: baseCar.x,
      y: lerp(-0.6, 1.1, s1),
      z: baseCar.z,
      rx: lerp(0, -0.05, s1),
      ry: lerp(0, degToRad(25), s1),
      rz: baseCar.rz,
    };
    const liftCam: CameraPose = {
      ...baseCam,
      z: lerp(6, 5, s1),
    };

    // --- Stage 3: floating reveal
    // x: 0 -> 0.6, y: 0.5 -> 1.2, z: 0 -> -0.8
    // ry: 25 -> 120, rz: 0 -> 0.08
    const floatCar: CarPose = {
      x: lerp(liftCar.x, 0.6, s2),
      y: lerp(liftCar.y, 1.8, s2),
      z: lerp(liftCar.z, -0.8, s2),
      rx: liftCar.rx,
      ry: lerp(liftCar.ry, degToRad(120), s2),
      rz: lerp(liftCar.rz, 0.08, s2),
    };
    const floatCam: CameraPose = {
      ...liftCam,
      x: lerp(liftCam.x, 3.2, s2),
      y: lerp(liftCam.y, 1.85, s2),
      z: lerp(liftCam.z, 4.8, s2),
    };

    // --- Stage 4: hero motion
    // x: 0.6 -> 0, y: 1.2 -> 0.9, z: -0.8 -> -1.2
    // ry: 120 -> 180
    // cam: [4,2,6] -> [2,1.6,4] (we blend from floatCam into target)
    const heroCar: CarPose = {
      x: lerp(floatCar.x, 0, s3),
      y: lerp(floatCar.y, 1.5, s3),
      z: lerp(floatCar.z, -1.2, s3),
      rx: floatCar.rx,
      ry: lerp(floatCar.ry, degToRad(180), s3),
      rz: floatCar.rz,
    };
    const heroCam: CameraPose = {
      x: lerp(floatCam.x, 2, s3),
      y: lerp(floatCam.y, 1.6, s3),
      z: lerp(floatCam.z, 4, s3),
      tx: 0,
      ty: 0.7,
      tz: -0.6,
    };

    // --- Stage 5: final hero pose
    // pos [0, 0.6, -1.4], ry: 200deg, slight forward tilt
    const finalCar: CarPose = {
      x: lerp(heroCar.x, 0, s4),
      y: lerp(heroCar.y, 1.2, s4),
      z: lerp(heroCar.z, -1.4, s4),
      rx: lerp(heroCar.rx, -0.06, s4),
      ry: lerp(heroCar.ry, degToRad(200), s4),
      rz: lerp(heroCar.rz, 0.02, s4),
    };
    const finalCam: CameraPose = {
      x: lerp(heroCam.x, 2.2, s4),
      y: lerp(heroCam.y, 1.65, s4),
      z: lerp(heroCam.z, 4.2, s4),
      tx: 0,
      ty: 0.65,
      tz: -0.9,
    };

    // Apply micro drift based on global progress for organic feel (no GSAP tween allocations)
    const drift = (progress / 10) * Math.PI * 2;
    const microX = Math.sin(drift) * 0.03;
    const microZ = Math.cos(drift * 0.8) * 0.03;

    scrollState.car = {
      ...finalCar,
      x: finalCar.x + microX,
      z: finalCar.z + microZ,
    };
    scrollState.camera = finalCam;

    // Light sweep panel X: -8 -> 8 over stages 2..4 (segment 1..3)
    const sweepT = clamp01((progress - 1) / 3);
    scrollState.lightSweepX = lerp(-8, 8, ease(sweepT));
  });
}
