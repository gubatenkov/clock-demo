'use client'

import {
  Float,
  OrbitControls,
  ContactShadows,
  PresentationControls,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Clock from './Clock'

const Scene = () => {
  return (
    <Canvas
      className="aspect-square w-full"
      gl={{ antialias: true }}
      camera={{
        position: [6.5, 3, -4],
        near: 0.01,
        fov: 45,
        far: 30,
      }}
      dpr={2}
    >
      <PresentationControls
        config={{ mass: 2, tension: 150 }}
        snap={{ mass: 3, tension: 50 }}
        rotation={[0, 0.3, 0]}
        polar={[0, 0]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
        zoom={1.1}
        global
      >
        <Float floatIntensity={0.25} speed={0.5}>
          <Clock />
        </Float>
      </PresentationControls>

      <ContactShadows
        position={[0, -1, 0]}
        resolution={256}
        opacity={0.5}
        scale={25}
        blur={2}
        far={5}
      />
      <ambientLight intensity={1} color="white" />
      {/* <OrbitControls maxZoom={1.1} /> */}
    </Canvas>
  )
}
export default Scene
