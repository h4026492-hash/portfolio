import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import HologramTable from './HologramTable'

interface HologramBackgroundProps {
  onSectionSelect: (section: string) => void
  activeSection: string
}

export default function HologramBackground({ onSectionSelect, activeSection }: HologramBackgroundProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <HologramTable onSectionSelect={onSectionSelect} activeSection={activeSection} />

        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minPolarAngle={Math.PI / 4}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
