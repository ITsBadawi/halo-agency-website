'use client'

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, Center, Sparkles, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { ArrowDown, ArrowUpRight, Sparkles as SparklesIcon } from 'lucide-react'

// Preload the GLB model
useGLTF.preload('/logo-3d.glb')

function LogoModel() {
  const { scene } = useGLTF('/logo-3d.glb')
  const groupRef = useRef<THREE.Group>(null)

  // Smooth continuous rotation + responsive mouse parallax
  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Continuous idle rotation
    groupRef.current.rotation.y += delta * 0.45
    // Subtle mouse reaction
    const targetX = (state.pointer.y * Math.PI) / 8
    const targetZ = -(state.pointer.x * Math.PI) / 10
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, 0.05)
  })

  return (
    <group ref={groupRef}>
      <Center>
        <primitive
          object={scene}
          scale={2.5}
          dispose={null}
        />
      </Center>
    </group>
  )
}

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
        <span className="absolute text-[11px] font-mono tracking-widest text-purple-300 uppercase">3D</span>
      </div>
    </div>
  )
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToWork = () => {
    const el = document.getElementById('work')
    if (el) {
      const offset = 80
      const pos = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: pos - offset, behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      const offset = 80
      const pos = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: pos - offset, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 w-fit mb-6">
            <SparklesIcon className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-300">
              Creative Agency / NYC & Worldwide
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl xl:text-8xl font-normal tracking-tight text-white leading-[0.95] mb-6">
            Ideas with <br />
            <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400">
              gravity.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed mb-10 font-normal">
            Halo is an independent creative studio shaping visual identities, digital platforms, and cinematic brand worlds for ambitious teams who refuse to blend in.
          </p>

          {/* Buttons & Scroll Indicator */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider text-black bg-purple-400 hover:bg-purple-300 transition-all duration-300 shadow-xl shadow-purple-500/20 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToWork}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider text-neutral-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 text-purple-400" />
            </button>
          </div>

          {/* Micro stats banner */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">200+</div>
              <div className="text-[11px] font-medium tracking-wider uppercase text-neutral-500 mt-1">
                Completed Works
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">50+</div>
              <div className="text-[11px] font-medium tracking-wider uppercase text-neutral-500 mt-1">
                Global Clients
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">99%</div>
              <div className="text-[11px] font-medium tracking-wider uppercase text-neutral-500 mt-1">
                Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Canvas */}
        <div className="lg:col-span-5 h-[380px] sm:h-[460px] lg:h-[540px] relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#131219]/90 to-[#0b0b0e]/95 shadow-2xl shadow-purple-950/20 backdrop-blur-xl group">
          {/* Subtle Canvas Corner Labels */}
          <div className="absolute top-4 left-5 z-20 pointer-events-none">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Halo 3D Identity
            </span>
          </div>

          <div className="absolute bottom-4 right-5 z-20 pointer-events-none">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
              Drag / Hover to Interact
            </span>
          </div>

          {mounted ? (
            <Suspense fallback={<CanvasLoader />}>
              <Canvas
                shadows
                camera={{ position: [0, 0, 4.2], fov: 42 }}
                dpr={[1, 2]}
                className="cursor-grab active:cursor-grabbing"
              >
                {/* Ambient & Studio Lights */}
                <ambientLight intensity={1.2} />
                <directionalLight position={[4, 5, 4]} intensity={2.5} color="#ffffff" />
                <directionalLight position={[-4, -3, -2]} intensity={1.8} color="#9d72ff" />
                <pointLight position={[0, 3, 2]} intensity={3.5} color="#b69cff" />
                <pointLight position={[2, -2, 2]} intensity={2.2} color="#7c3aed" />

                <Float
                  speed={1.8}
                  rotationIntensity={0.25}
                  floatIntensity={0.4}
                  floatingRange={[-0.12, 0.12]}
                >
                  <LogoModel />
                </Float>

                <Sparkles
                  count={45}
                  scale={4.5}
                  size={1.6}
                  speed={0.3}
                  color="#b69cff"
                  opacity={0.6}
                />

                <ContactShadows
                  position={[0, -1.6, 0]}
                  opacity={0.45}
                  scale={6}
                  blur={2.4}
                  far={4}
                  color="#2e1065"
                />
              </Canvas>
            </Suspense>
          ) : (
            <CanvasLoader />
          )}
        </div>
      </div>
    </section>
  )
}
