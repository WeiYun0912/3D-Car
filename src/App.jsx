import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Ground from "./components/Ground";
import Car from "./components/Car";
import "./style.css";
import CanvasLoader from "./components/Loader";

const CarShow = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={20} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />
      <Car />
      <spotLight
        color={[0.1, 0.25, 0.7]}
        intensity={100}
        angle={1.0}
        penumbra={0.8}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
        receiveShadow
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={50}
        angle={1.0}
        penumbra={0.8}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
        receiveShadow
      />
      {/* <ambientLight color={0x000000} /> */}
      <Ground />
    </>
  );
};

const App = () => {
  return (
    <Canvas shadows>
      <Suspense fallback={<CanvasLoader />}>
        <CarShow />
      </Suspense>
    </Canvas>
  );
};

export default App;
