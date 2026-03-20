import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skillCategories = [
    {
      title: '3D & Graphics',
      skills: [
        { name: 'Three.js', level: 95 },
        { name: 'WebGL', level: 90 },
        { name: 'GLSL Shaders', level: 85 },
        { name: 'Blender', level: 80 },
      ],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
      ],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Animation',
      skills: [
        { name: 'Framer Motion', level: 90 },
        { name: 'GSAP', level: 85 },
        { name: 'CSS Animations', level: 92 },
        { name: 'Physics Engines', level: 80 },
      ],
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Tools & Other',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'WebXR', level: 75 },
        { name: 'Node.js', level: 85 },
        { name: 'WebRTC', level: 70 },
      ],
      gradient: 'from-green-500 to-emerald-500',
    },
  ]

  return (
    <section id="skills" ref={ref} className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                        className={`h-full bg-gradient-to-r ${category.gradient} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Skill Icons */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {['React', 'Three.js', 'WebGL', 'TypeScript', 'Tailwind', 'GSAP', 'Next.js', 'Blender'].map(
            (tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="glass px-6 py-3 rounded-full text-white font-medium glow cursor-pointer"
              >
                {tech}
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
