import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Staggered animation workflow for a more dynamic feel
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="about" ref={ref} className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Professional Journey
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-indigo-300">Architecting Digital Experiences</h3>
            <p className="text-xl text-gray-400 leading-relaxed">
              With over half a decade of hands-on experience, I specialize in bridging the gap between 
              technical complexity and intuitive design. My focus is on high-performance WebGL 
              graphics and modern React architectures.
            </p>
            <p className="text-xl text-gray-400 leading-relaxed">
              I transform concepts into immersive digital realities, ensuring every interaction 
              feels fluid and every pixel has a purpose.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block pt-4"
            >
              <button className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all cursor-pointer">
                Download Resume
              </button>
            </motion.div>
          </motion.div>

          {/* Right - Interactive Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-4 lg:gap-6"
          >
            {[
              { number: '6+', label: 'Years Experience' }, // Updated Stat
              { number: '120+', label: 'Projects Completed' },
              { number: '80+', label: 'Happy Clients' },
              { number: '20+', label: 'Awards Won' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  backgroundColor: "rgba(255, 255, 255, 0.08)"
                }}
                className="glass rounded-3xl p-8 text-center border border-white/10 transition-colors group"
              >
                <h3 className="text-4xl lg:text-5xl font-black bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent mb-2 group-hover:from-indigo-400 group-hover:to-pink-400 transition-all duration-500">
                  {stat.number}
                </h3>
                <p className="text-xs lg:text-sm uppercase tracking-widest text-gray-500 font-bold group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
