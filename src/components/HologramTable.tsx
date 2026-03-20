import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, Trail, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface HologramTableProps {
  onSectionSelect: (section: string) => void
  activeSection: string
}

export default function HologramTable({ onSectionSelect, activeSection }: HologramTableProps) {
  const baseRef = useRef<THREE.Group>(null)
  const ringsRef = useRef<THREE.Group>(null)
  
  // Rotating animations
  useFrame((state, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y += delta * 0.2
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    if (baseRef.current) {
      baseRef.current.rotation.y += delta * 0.05
    }
  })

  const sections = [
    { id: 'about', label: 'ABOUT', color: '#6366f1', angle: 0 },
    { id: 'projects', label: 'PROJECTS', color: '#ec4899', angle: Math.PI / 2 },
    { id: 'skills', label: 'SKILLS', color: '#14b8a6', angle: Math.PI },
    { id: 'contact', label: 'CONTACT', color: '#f59e0b', angle: (Math.PI * 3) / 2 },
  ]

  const radius = 4

  return (
    <group position={[0, -1, 0]}>
      {/* Central Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 1.5, 0]}>
          <octahedronGeometry args={[0.8, 0]} />
          <MeshDistortMaterial
            color="#4f46e5"
            emissive="#4338ca"
            emissiveIntensity={2}
            distort={0.4}
            speed={2}
            wireframe
          />
        </mesh>
      </Float>

      {/* Hologram Base Platter */}
      <group ref={baseRef}>
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[5, 5.5, 0.5, 64]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Inner glowing ring */}
        <mesh position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.8, 4.2, 64]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.3} />
        </mesh>

        <gridHelper args={[10, 20, 0x38bdf8, 0x1e293b]} position={[0, 0.27, 0]} />
      </group>

      {/* Rotating Cyberpunk Rings */}
      <group ref={ringsRef} position={[0, 1.5, 0]}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 2, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#ec4899" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[0, Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[3.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#14b8a6" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Particles around the table */}
      <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.3} color="#818cf8" position={[0, 2, 0]} />

      {/* Section Selectors */}
      {sections.map((sec) => {
        const x = Math.cos(sec.angle) * radius
        const z = Math.sin(sec.angle) * radius
        const isActive = activeSection === sec.id

        return (
          <group key={sec.id} position={[x, 1, z]}>
            <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
              <mesh 
                onClick={(e) => {
                  e.stopPropagation()
                  onSectionSelect(sec.id)
                }}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'auto'}
              >
                <boxGeometry args={[2, 0.8, 0.1]} />
                <meshStandardMaterial 
                  color={isActive ? sec.color : '#1e293b'} 
                  emissive={isActive ? sec.color : '#000000'}
                  emissiveIntensity={isActive ? 2 : 0}
                  transparent 
                  opacity={0.8}
                  wireframe={!isActive}
                />
              </mesh>
              
              <Text
                position={[0, 0, 0.06]}
                fontSize={0.3}
                color={isActive ? '#ffffff' : sec.color}
                anchorX="center"
                anchorY="middle"
              >
                {sec.label}
              </Text>
              
              {/* Connection line to center */}
              <Trail
                width={0.2}
                length={2}
                color={sec.color}
                attenuation={(t) => t * t}
              >
                <mesh position={[0, -0.4, 0]}>
                  <sphereGeometry args={[0.05]} />
                  <meshBasicMaterial color={sec.color} />
                </mesh>
              </Trail>
            </Float>
          </group>
        )
      })}
    </group>
  )
}
