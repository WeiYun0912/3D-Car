import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

const Rings = () => {
  const itemsRef = useRef([]);
  useFrame((state) => {
    let elapsed = state.clock.getElapsedTime();
    for (let i = 0; i < itemsRef.current.length; i++) {
      let mesh = itemsRef.current[i];

      let z = [i - 7] * 3.5 + ((elapsed * 0.5) % 3.5) * 2;
      mesh.position.set(0, 0, -z);

      let dist = Math.abs(z); //distance

      mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);
      let colorScale = 1;

      if (dist > 2) {
        colorScale = 1 - (Math.min(dist, 12) - 2) / 10;
      }

      colorScale *= 0.5;

      if (i % 2 == 1) {
        mesh.material.emissive = new Color(0.5, 0.15, 10).multiplyScalar(
          colorScale
        );
      } else {
        mesh.material.emissive = new Color(0.5, 1, 20).multiplyScalar(
          colorScale
        );
      }
    }
  });
  return (
    <>
      {Array.from({ length: 14 }).map((v, i) => (
        <mesh
          key={i}
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          ref={(el) => (itemsRef.current[i] = el)}
        >
          <torusGeometry args={[3.35, 0.15, 10, 100]} />
          <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
        </mesh>
      ))}
    </>
  );
};

export default Rings;
