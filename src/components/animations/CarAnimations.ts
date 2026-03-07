import * as THREE from "three";
import { getSegmentProgress } from "./MasterTimeline";

export function applyCarAnimations(
    group: THREE.Group,
    materials: THREE.Material[],
    sceneProgress: number
) {
    // Drive forward animation (segment 9 -> 10)
    const driveProgress = getSegmentProgress(9, sceneProgress);
    group.position.z = driveProgress * 15; // Drive forward 15 units

    // AI scanning transformation (segment 2 -> 3)
    const scanProgress = getSegmentProgress(2, sceneProgress);

    if (scanProgress > 0 && scanProgress < 1) {
        materials.forEach(mat => {
            const stdMat = mat as THREE.MeshStandardMaterial;
            stdMat.wireframe = scanProgress > 0.5;
            stdMat.transparent = true;
            stdMat.opacity = 1 - Math.abs(scanProgress - 0.5) * 2;
        });
    } else {
        materials.forEach(mat => {
            const stdMat = mat as THREE.MeshStandardMaterial;
            stdMat.wireframe = false;
            stdMat.transparent = false;
            stdMat.opacity = 1;
        });
    }
}
