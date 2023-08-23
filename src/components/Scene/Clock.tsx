'use client'

import { useRef } from 'react'
import { useControls } from 'leva'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Color, DirectionalLight, Group, MeshStandardMaterial } from 'three'

const dirLight1 = new DirectionalLight('#fffee0', 30)
const dirLight2 = new DirectionalLight('#ffffff', 10)

const corpusMaterial = new MeshStandardMaterial({
  color: new Color('#faa869'),
})
const buttonsMaterial = new MeshStandardMaterial({
  color: new Color('#000'),
  metalness: 1,
  roughness: 0.3,
})
const lastButtonMaterial = new MeshStandardMaterial({
  color: new Color('#e16c43'),
})

export default function Clock(props: any) {
  const clock = useRef<Group>(null)
  const { nodes, materials }: any = useGLTF('/clock.glb', '/draco/')
  const {
    lastButtonColor,
    color1,
    color2,
    intensity1,
    intensity2,
    corpusRoughness,
    corpusMetallness,
  } = useControls({
    intensity2: { value: 3, min: 0, max: 100, step: 0.01 },
    intensity1: { value: 10, min: 0, max: 100, step: 0.01 },
    color2: { value: '#ffffff' },
    color1: { value: '#ff271f' },
    corpusMetallness: { value: 0, min: 0, max: 1, step: 0.01 },
    corpusRoughness: { value: 1, min: 0, max: 1, step: 0.01 },
    lastButtonColor: { value: '#ff271f' },
  })
  const { buttonsColor, corpusColor } = useControls({
    buttonsColor: '#000',
    corpusColor: '#faa869',
  })
  const { scene } = useThree()

  dirLight1.color = new Color(color2)
  dirLight1.intensity = intensity1
  dirLight2.color = new Color(color1)
  dirLight2.intensity = intensity2
  dirLight2.position.set(-10, -10, -10)
  dirLight1.position.set(10, 2.75, 10)
  dirLight2.lookAt(0, 0, 0)
  dirLight1.lookAt(0, 0, 0)
  corpusMaterial.color = new Color(corpusColor)
  corpusMaterial.roughness = corpusRoughness
  corpusMaterial.metalness = corpusMetallness
  buttonsMaterial.color = new Color(buttonsColor)
  lastButtonMaterial.color = new Color(lastButtonColor)

  scene.add(dirLight1, dirLight2)

  useFrame(() => {
    if (clock.current && clock.current.scale.x < 1) {
      clock.current.scale.x += 0.01
      clock.current.scale.y += 0.01
      clock.current.scale.z += 0.01
    }
  })

  return (
    <group {...props} dispose={null} position={[0, 0, 0]} ref={clock} scale={0}>
      <mesh
        name="Corpus"
        castShadow
        receiveShadow
        geometry={nodes.Corpus.geometry}
        material={corpusMaterial}
      />
      <mesh
        name="Screen"
        castShadow
        receiveShadow
        geometry={nodes.Screen.geometry}
        material={buttonsMaterial}
      />
      <mesh
        name="Button_1"
        castShadow
        receiveShadow
        geometry={nodes.Button_1.geometry}
        material={buttonsMaterial}
      />
      <mesh
        name="Button_2"
        castShadow
        receiveShadow
        geometry={nodes.Button_2.geometry}
        material={buttonsMaterial}
      />
      <mesh
        name="Button_3"
        castShadow
        receiveShadow
        geometry={nodes.Button_3.geometry}
        material={lastButtonMaterial}
      />
    </group>
  )
}

useGLTF.preload('/clock.glb')
