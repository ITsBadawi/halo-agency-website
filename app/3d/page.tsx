'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial, OrbitControls, Sparkles, Text } from '@react-three/drei'
import { ArrowUpRight, ArrowDown, Menu, X } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { TextureLoader, type Mesh } from 'three'

const workImages = ['/work-brand.png', '/work-digital.png', '/work-world.png']

function WorkTile({ image, latitude, longitude }: { image: string; latitude: number; longitude: number }) {
  const texture = useLoader(TextureLoader, image)
  const radius = 1.76
  const phi = (latitude * Math.PI) / 180
  const theta = (longitude * Math.PI) / 180
  const position = useMemo(() => [radius * Math.cos(phi) * Math.cos(theta), radius * Math.sin(phi), radius * Math.cos(phi) * Math.sin(theta)] as [number, number, number], [phi, theta])
  const rotation = useMemo(() => [0, -theta + Math.PI / 2, -phi] as [number, number, number], [phi, theta])

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[0.86, 0.86]} />
      <meshBasicMaterial map={texture} toneMapped={false} side={2} />
    </mesh>
  )
}

function HaloOrb() {
  const orb = useRef<Mesh>(null)
  useFrame((state, delta) => {
    if (!orb.current) return
    orb.current.rotation.x += delta * 0.14
    orb.current.rotation.y += delta * 0.22
    orb.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.12
  })

  const tiles = Array.from({ length: 24 }, (_, index) => ({
    image: workImages[index % workImages.length],
    latitude: -60 + (index % 6) * 24,
    longitude: Math.floor(index / 6) * 58 + (index % 2) * 18,
  }))

  return (
    <Float speed={1.25} rotationIntensity={0.34} floatIntensity={0.55}>
      <group ref={orb}>
        {tiles.map((tile, index) => <WorkTile key={`${tile.image}-${index}`} {...tile} />)}
        <mesh>
          <sphereGeometry args={[1.79, 64, 64]} />
          <MeshTransmissionMaterial backside samples={4} thickness={0.22} chromaticAberration={0.08} anisotropy={0.35} distortion={0.08} color="#8d72ff" transmission={0.72} roughness={0.2} ior={1.45} transparent opacity={0.28} />
        </mesh>
      </group>
    </Float>
  )
}

function Scene() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 38 }}>
      <color attach="background" args={['#0b0910']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={3.3} color="#dcd2ff" castShadow />
      <pointLight position={[-3, -2, 3]} intensity={8} color="#7548ff" />
      <pointLight position={[4, -1, 1]} intensity={5} color="#ff4f9a" />
      <HaloOrb />
      <Text position={[0, -2.48, 0]} fontSize={0.2} letterSpacing={0.28} color="#b9abc9" anchorX="center" anchorY="middle">HALO / DIGITAL MATTER</Text>
      <Sparkles count={90} scale={9} size={1.8} speed={0.18} color="#b69cff" />
      <Environment preset="studio" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.45} minPolarAngle={Math.PI / 2.35} maxPolarAngle={Math.PI / 1.65} />
    </Canvas>
  )
}

export default function ThreePage() {
  const [open, setOpen] = useState(false)
  return (
    <main className="three-page">
      <header className="three-header">
        <a className="three-wordmark" href="/">H<span>ALO</span><b>.</b></a>
        <nav className={open ? 'three-nav is-open' : 'three-nav'} aria-label="Main navigation">
          <a href="#vision" onClick={() => setOpen(false)}>Vision</a>
          <a href="#practice" onClick={() => setOpen(false)}>Practice</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
        <a className="three-header-link" href="mailto:hello@halo.studio">Start a project <ArrowUpRight size={15} /></a>
        <button className="three-menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
      </header>

      <section className="three-hero" id="vision">
        <div className="three-hero-copy">
          <p className="three-eyebrow">Independent creative studio / 03D</p>
          <h1>We make<br /><em>ideas</em> tangible.</h1>
          <p className="three-lede">Halo shapes identities, products, and worlds with enough gravity to pull people closer.</p>
          <a className="three-pill" href="#practice">Enter the practice <ArrowDown size={16} /></a>
        </div>
        <div className="three-canvas"><Scene /><span className="canvas-label label-top">A living identity<br />in constant motion</span><span className="canvas-label label-bottom">Drag / rotate / discover</span></div>
        <div className="three-coordinate">40°42&apos;46&quot;N<br />74°00&apos;21&quot;W</div>
      </section>

      <section className="three-intro" id="practice"><p className="three-eyebrow">01 / The point of view</p><h2>Not flat.<br /><em>Never static.</em></h2><div><p>We believe the best brand experiences have dimension. They respond, reveal, and reward attention.</p><a href="mailto:hello@halo.studio">Talk to us <ArrowUpRight size={16} /></a></div></section>
      <section className="three-grid"><article><span>01</span><h3>Systems with depth</h3><p>Flexible identities designed to move across screens, spaces, and every in-between.</p></article><article><span>02</span><h3>Digital with feeling</h3><p>Interfaces that turn utility into a place people want to spend time inside.</p></article><article><span>03</span><h3>Worlds worth entering</h3><p>Campaigns and environments built with a clear point of view and a little wonder.</p></article></section>
      <section className="three-contact" id="contact"><p className="three-eyebrow">02 / Make something move</p><h2>Bring us<br /><em>your impossible.</em></h2><a className="three-pill light-pill" href="mailto:hello@halo.studio">hello@halo.studio <ArrowUpRight size={17} /></a></section>
      <footer className="three-footer"><span>HALO / 2025</span><span>New York / Worldwide</span><a href="/">Back to the original studio <ArrowUpRight size={14} /></a></footer>
    </main>
  )
}
