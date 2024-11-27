"use client"

import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Float, Environment } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import * as THREE from 'three'

interface Skill {
  name: string
  value: number
}

interface SkillsGlobeProps {
  skills: Skill[]
}

const SkillNode = ({ skill, index, total }: { skill: Skill; index: number; total: number }) => {
  const phi = Math.acos(-1 + (2 * index) / total)
  const theta = Math.sqrt(total * Math.PI) * phi

  const x = Math.cos(theta) * Math.sin(phi) * (2 + skill.value / 25)
  const y = Math.sin(theta) * Math.sin(phi) * (2 + skill.value / 25)
  const z = Math.cos(phi) * (2 + skill.value / 25)

  return (
    <group position={[x, y, z]}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Text
          color="white"
          fontSize={0.3}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="left"
          font="/fonts/inter.woff2"
          anchorX="left"
          anchorY="middle"
        >
          {skill.name}
        </Text>
        <mesh position={[-0.4, 0, 0]}>
          <sphereGeometry args={[0.1 * skill.value / 50, 16, 16]} />
          <meshStandardMaterial 
            color="#4F46E5" 
            emissive="#2563EB"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  )
}

const Scene = ({ skills }: SkillsGlobeProps) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <motion.group
        ref={groupRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.3,
          type: "spring",
          stiffness: 100
        }}
      >
        {skills.map((skill, i) => (
          <SkillNode 
            key={skill.name} 
            skill={skill} 
            index={i} 
            total={skills.length} 
          />
        ))}
      </motion.group>
      <OrbitControls 
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

const SkillsGlobe: React.FC<SkillsGlobeProps> = ({ skills }) => {
  return (
    <div className="h-[400px] w-full relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Suspense fallback={null}>
          <Scene skills={skills} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default SkillsGlobe 