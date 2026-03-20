import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projects = [
    {
      title: '3D Product Visualizer',
      description: 'Interactive 3D product showcase with real-time lighting and material customization',
      tags: ['Three.js', 'WebGL', 'React'],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Immersive Art Gallery',
      description: 'Virtual gallery experience with physics-based interactions and VR support',
      tags: ['WebXR', 'GLSL', 'Physics'],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Particle Universe',
      description: 'GPU-accelerated particle system with 1M+ particles and custom shaders',
      tags: ['GPGPU', 'Shaders', 'WebGL2'],
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Neural Network Viz',
      description: 'Real-time visualization of neural networks with 3D graph rendering',
      tags: ['D3.js', 'Three.js', 'AI'],
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Metaverse Hub',
      description: 'Multi-user 3D social space with avatars and spatial audio',
      tags: ['WebRTC', '3D', 'Networking'],
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Shader Playground',
      description: 'Interactive shader editor with live preview and preset library',
      tags: ['GLSL', 'WebGL', 'Editor'],
      gradient: 'from-pink-500 to-rose-500',
    },
  ]

  return (
    <section id="projects" ref={ref} className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative glass rounded-2xl p-6 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm bg-white/10 rounded-full text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>


              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
