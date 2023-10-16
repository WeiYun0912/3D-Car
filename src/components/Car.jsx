import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Car = () => {
  const gltf = useLoader(GLTFLoader, "models/car/scene.gltf");

  useEffect(() => {
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.set(0, -0.035, 0);
    gltf.scene.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        // obj.material.color.set(0xff9ac4);
      }
    });
  }, [gltf]);

  useFrame((state) => {
    let t = state.clock.getElapsedTime();

    let group = gltf.scene.children[0].children[0].children[0];

    group.children[0].rotation.x = t * 4;

    group.children[2].rotation.x = t * 4;
    group.children[4].rotation.x = t * 4;
    group.children[6].rotation.x = t * 4;
  });
  return <primitive object={gltf.scene} />;
};

export default Car;
