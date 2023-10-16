import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Ground from "./components/Ground";
import Car from "./components/Car";

import "./style.css";
import CanvasLoader from "./components/Loader";
import Rings from "./components/Rings";
import Boxes from "./components/Boxes";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
const CarShow = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={20} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <Rings />
      <Boxes />
      {/* <FloatingGrid /> */}
      <spotLight
        color={[0.1, 0.25, 0.7]}
        intensity={200}
        angle={0.8}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
        receiveShadow
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={200}
        angle={1.0}
        penumbra={0.8}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
        receiveShadow
      />
      {/* <ambientLight color={0x000000} /> */}
      <Ground />

      <EffectComposer>
        {/* <DepthOfField
          focusDistance={0.0035}
          focalLength={0.01}
          bokehScale={3}
          height={480}
        /> */}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer>
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
