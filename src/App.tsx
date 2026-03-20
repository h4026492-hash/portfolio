import { useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import HologramBackground from './components/HologramBackground'
import FloatingObjects from './components/FloatingObjects'
import CSS3DCube from './components/CSS3DCube'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  const handleSectionSelect = (section: string) => {
    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <HologramBackground onSectionSelect={handleSectionSelect} activeSection={activeSection} />
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/50 to-black/80" />
        <div className="stars-container">
          <div className="stars-small" />
          <div className="stars-medium" />
          <div className="stars-large" />
        </div>
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
      </div>

      {/* Navigation */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      

      {/* Floating Objects */}
      <FloatingObjects />
      
      {/* 3D Cube */}
      <CSS3DCube />

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  )
}

export default App
