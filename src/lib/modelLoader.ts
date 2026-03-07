import { useGLTF } from "@react-three/drei";

export const CAR_MODEL_URL = "/uploads_files_5099621_mclaren_p1_gtr_2015-gltf/scene.gltf";

export function preloadModels() {
    useGLTF.preload(CAR_MODEL_URL);
}
