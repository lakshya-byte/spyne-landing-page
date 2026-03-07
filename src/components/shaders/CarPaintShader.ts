import * as THREE from 'three';

/**
 * Creates a physically accurate automotive paint material.
 * Features a base coat, metallic flakes (via normal map), and a clearcoat layer.
 */
export function createCarPaintMaterial(
    color: string = '#111111',
    flakeScale: number = 400.0
): THREE.MeshPhysicalMaterial {
    // Procedural noise texture for metallic flakes
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');

    if (context) {
        context.fillStyle = '#000';
        context.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 4000; i++) {
            const x = Math.random() * 256;
            const y = Math.random() * 256;
            const r = Math.random() * 255;
            context.fillStyle = `rgb(${r},${r},${r})`;
            context.fillRect(x, y, 1, 1);
        }
    }

    const flakeTexture = new THREE.CanvasTexture(canvas);
    flakeTexture.wrapS = THREE.RepeatWrapping;
    flakeTexture.wrapT = THREE.RepeatWrapping;
    flakeTexture.repeat.set(flakeScale, flakeScale);

    return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.9,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        normalMap: flakeTexture,
        normalScale: new THREE.Vector2(0.3, 0.3),
        envMapIntensity: 2.5,
    });
}
