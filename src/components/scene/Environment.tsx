"use client";

import { Environment as DreiEnvironment } from "@react-three/drei";

export default function Environment() {
  return (
    <>
      <fogExp2 attach="fog" args={["#050505", 0.02]} />
      <DreiEnvironment preset="studio" background={false} blur={0.8} />
    </>
  );
}
