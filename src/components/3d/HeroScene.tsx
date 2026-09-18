import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PointMaterial, Points } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useDocumentVisible } from '../../hooks/useDocumentVisible'

const extrude = { depth: 0.3, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: 0.045, bevelThickness: 0.055 }

function createLogoShapes() {
  const left = new THREE.Shape()
  left.moveTo(-1.72, 1.3)
  left.lineTo(-1.25, 1.3)
  left.bezierCurveTo(-0.86, 1.3, -0.64, 1.02, -0.6, 0.63)
  left.lineTo(-0.6, -0.28)
  left.bezierCurveTo(-0.65, -0.72, -1.13, -1.15, -1.52, -1.42)
  left.bezierCurveTo(-1.68, -1.08, -1.72, -0.55, -1.72, -0.04)
  left.closePath()

  const center = new THREE.Shape()
  center.moveTo(-1.24, 1.3)
  center.lineTo(-0.08, 1.3)
  center.bezierCurveTo(0.53, 1.3, 0.86, 0.9, 0.86, 0.32)
  center.lineTo(0.86, -0.58)
  center.bezierCurveTo(0.62, -0.42, 0.45, -0.2, 0.23, 0.03)
  center.bezierCurveTo(-0.02, 0.31, -0.3, 0.43, -0.6, 0.38)
  center.lineTo(-0.6, 0.66)
  center.bezierCurveTo(-0.64, 1.02, -0.86, 1.3, -1.24, 1.3)
  center.closePath()
  const head = new THREE.Path()
  head.absellipse(0.04, 0.63, 0.27, 0.31, 0, Math.PI * 2, true)
  center.holes.push(head)

  const right = new THREE.Shape()
  right.moveTo(0.87, 1.3)
  right.lineTo(1.7, 1.3)
  right.lineTo(1.7, -0.78)
  right.bezierCurveTo(1.7, -1.2, 1.48, -1.43, 1.12, -1.43)
  right.lineTo(0.72, -1.43)
  right.bezierCurveTo(0.88, -1.04, 0.91, -0.58, 0.86, -0.14)
  right.closePath()
  return { left, center, right }
}

function createRibbonShape() {
  const ribbon = new THREE.Shape()
  ribbon.moveTo(-1.62, -0.73)
  ribbon.bezierCurveTo(-1.18, -0.29, -0.7, -0.06, -0.28, -0.06)
  ribbon.bezierCurveTo(0.18, -0.06, 0.55, -0.34, 0.91, -0.57)
  ribbon.lineTo(0.77, -0.81)
  ribbon.bezierCurveTo(0.4, -0.57, 0.08, -0.31, -0.3, -0.31)
  ribbon.bezierCurveTo(-0.72, -0.31, -1.08, -0.53, -1.49, -0.94)
  ribbon.closePath()
  return ribbon
}

function LogoSculpture({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const visible = useDocumentVisible()
  const shapes = useMemo(createLogoShapes, [])
  const ribbon = useMemo(createRibbonShape, [])

  useFrame((state) => {
    if (!group.current || reduced || !visible) return
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.13, 0.035)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.07, 0.035)
  })

  return (
    <group ref={group} rotation={[-0.035, -0.07, -0.015]} scale={0.86}>
      <Float speed={reduced ? 0 : 1.1} rotationIntensity={reduced ? 0 : 0.025} floatIntensity={reduced ? 0 : 0.18}>
        <mesh geometry={new THREE.ExtrudeGeometry(shapes.left, extrude)}>
          <meshPhysicalMaterial color="#18c5ce" roughness={0.22} metalness={0.08} clearcoat={0.9} clearcoatRoughness={0.15} />
        </mesh>
        <mesh geometry={new THREE.ExtrudeGeometry(shapes.center, extrude)}>
          <meshPhysicalMaterial color="#0d9fd5" roughness={0.2} metalness={0.1} clearcoat={1} clearcoatRoughness={0.14} />
        </mesh>
        <mesh geometry={new THREE.ExtrudeGeometry(shapes.right, extrude)}>
          <meshPhysicalMaterial color="#12b7c1" roughness={0.22} metalness={0.08} clearcoat={0.9} clearcoatRoughness={0.15} />
        </mesh>
        <mesh position={[0, 0, 0.365]} geometry={new THREE.ExtrudeGeometry(ribbon, { depth: 0.02, bevelEnabled: false })}>
          <meshBasicMaterial color="#f8fbfc" toneMapped={false} />
        </mesh>
      </Float>
    </group>
  )
}

function Particles({ count }: { count: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 5.5
      positions[index * 3 + 1] = (Math.random() - 0.5) * 4.5
      positions[index * 3 + 2] = (Math.random() - 0.5) * 3
    }
    return positions
  }, [count])
  return <Points positions={points} stride={3}><PointMaterial transparent color="#5ce1e6" size={0.025} sizeAttenuation depthWrite={false} opacity={0.55} /></Points>
}

export default function HeroScene() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const mobile = useMediaQuery('(max-width: 768px)')
  return (
    <Canvas dpr={mobile ? [1, 1.4] : [1.25, 1.8]} camera={{ position: [0, 0, 5.4], fov: 43 }} gl={{ antialias: true, alpha: true, powerPreference: mobile ? 'low-power' : 'high-performance' }} frameloop={reduced ? 'demand' : 'always'}>
      <ambientLight intensity={0.95} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} color="#e8ffff" />
      <pointLight position={[-3, -2, 3]} intensity={4} distance={9} color="#1dc8de" />
      <LogoSculpture reduced={reduced} />
      <Particles count={mobile ? 18 : 44} />
    </Canvas>
  )
}
