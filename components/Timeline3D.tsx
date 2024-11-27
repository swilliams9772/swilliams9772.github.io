"use client"

import { useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Float, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import * as THREE from 'three'

interface TimelineItem {
  date: string
  value: number
  label: string
}

interface Timeline3DProps {
  data: TimelineItem[]
}

const TimelineNode = ({ item, index, total }: { item: TimelineItem; index: number; total: number }) => {
  const [hovered, setHovered] = useState(false)
  const position = new THREE.Vector3(
    (index - total / 2) * 2,
    item.value / 20 - 2,
    0
  )

  return (
    <group position={position}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.2, 32, 32]} />
          <MeshDistortMaterial
            color={hovered ? "#3B82F6" : "#1E40AF"}
            speed={5}
            distort={hovered ? 0.6 : 0.3}
            radius={1}
          />
        </mesh>
        <Text
          position={[0, 0.5, 0]}
          color="white"
          fontSize={0.2}
          maxWidth={2}
          textAlign="center"
          font="/fonts/inter.woff2"
        >
          {item.date}
        </Text>
        <Text
          position={[0, -0.5, 0]}
          color="#94A3B8"
          fontSize={0.15}
          maxWidth={2}
          textAlign="center"
          font="/fonts/inter.woff2"
        >
          {item.label}
        </Text>
      </Float>
      {index < total - 1 && (
        <mesh position={[1, item.value / 40 - 1, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>
      )}
    </group>
  )
}

const Scene = ({ data }: Timeline3DProps) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <motion.group
        initial={{ scale: 0, rotationX: Math.PI / 4 }}
        animate={{ scale: 1, rotationX: 0 }}
        transition={{
          duration: 1,
          delay: 0.3,
          type: "spring",
          stiffness: 100
        }}
      >
        {data.map((item, i) => (
          <TimelineNode 
            key={item.date} 
            item={item} 
            index={i} 
            total={data.length} 
          />
        ))}
      </motion.group>
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  )
}

const Timeline3D: React.FC<Timeline3DProps> = ({ data }) => {
  return (
    <div className="h-[400px] w-full relative">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <Scene data={data} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Timeline3D 