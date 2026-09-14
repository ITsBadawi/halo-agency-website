'use client'

import { ArrowUpRight, Menu, Sparkles, X } from 'lucide-react'
import { useState } from 'react'

const cards = [
  { title: 'Mellow Club', tag: 'Brand world', color: 'pink', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85' },
  { title: 'Forma', tag: 'Digital product', color: 'blue', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85' },
  { title: 'Daylight', tag: 'Campaign', color: 'yellow', image: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1200&q=85' },
]

export default function ColorPage() {
  const [open, setOpen] = useState(false)

  return (
    <main className="color-page">
      <header className="color-header">
        <a className="color-logo" href="/">HALO<span>✳</span></a>
        <nav className={open ? 'color-nav is-open' : 'color-nav'} aria-label="Main navigation">
          <a href="#work" onClick={() => setOpen(false)}>Work</a>
          <a href="#services" onClick={() => setOpen(false)}>Services</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
        </nav>
        <a className="color-contact" href="#contact">Let&apos;s talk <ArrowUpRight size={16} /></a>
        <button className="color-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </header>

      <section className="color-hero">
        <div className="hero-kicker"><Sparkles size={16} /> Independent creative studio / New York</div>
        <h1>Make it<br /><span>feel</span> <i>alive.</i></h1>
        <p>We build colorful identities and digital experiences for brands with something to say.</p>
        <a className="color-pill" href="#work">See the good stuff <ArrowUpRight size={17} /></a>
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-note note-left">Strategy<br />Design<br />Motion</div>
        <div className="hero-note note-right">01—25<br />Good energy only</div>
      </section>

      <section id="work" className="color-section work-color">
        <div className="color-section-head"><p>Selected work</p><h2>Bright ideas,<br /><em>made real.</em></h2><span>Scroll / explore</span></div>
        <div className="color-cards">{cards.map((card) => <article className={`color-card ${card.color}`} key={card.title}><div className="card-photo"><img src={card.image} alt={`${card.title} project`} /><span>↗</span></div><div className="card-copy"><h3>{card.title}</h3><p>{card.tag}</p></div></article>)}</div>
      </section>

      <section id="services" className="color-section service-color"><div className="service-intro"><p>What we do</p><h2>Good design<br />has <em>range.</em></h2></div><div className="service-bubbles"><div><b>01</b><h3>Identity</h3><p>Names, worlds, and visual systems that make a lasting impression.</p></div><div><b>02</b><h3>Digital</h3><p>Websites and products that are as useful as they are unforgettable.</p></div><div><b>03</b><h3>Campaigns</h3><p>Big ideas, beautifully executed, ready to travel far and wide.</p></div></div></section>

      <section id="about" className="color-manifesto"><p>Our point of view</p><h2>Less beige.<br /><span>More belief.</span></h2><div className="manifesto-bottom"><p>Halo is a small studio with a loud point of view. We bring strategy, design, and a little bit of mischief to ambitious teams making the future more interesting.</p><a href="#contact">Meet the studio <ArrowUpRight size={16} /></a></div></section>

      <section id="contact" className="color-contact-section"><div><p>Have a project?</p><h2>Let&apos;s make<br /><i>some noise.</i></h2><a className="color-pill dark-pill" href="mailto:hello@halo.studio">hello@halo.studio <ArrowUpRight size={17} /></a></div><div className="contact-scribble">Let&apos;s<br />go!</div></section>
      <footer className="color-footer"><a className="color-logo" href="/">HALO<span>✳</span></a><p>© 2025 Halo Studio / Made with good energy.</p><a href="/">Back to dark mode ↗</a></footer>
    </main>
  )
}
