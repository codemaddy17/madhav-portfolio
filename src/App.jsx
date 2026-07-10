import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import InfiniteMenu from './InfiniteMenu'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [dark, setDark] = useState(true)
  const [lbOpen, setLbOpen] = useState(false)
  const [lbData, setLbData] = useState({ cap: '', emoji: '', sub: '' })
  const [cIdx, setCIdx] = useState(0)
  const [activeCat, setActiveCat] = useState('all')
  const typedRef = useRef(null)
  const curRef = useRef(null)
  const ringRef = useRef(null)
  const scrollBarRef = useRef(null)
  const aboutRef = useRef(null)
  const cTrackRef = useRef(null)
  const slides = 4

  const toggleTheme = () => setDark(d => !d)

  const openLB = (cap, emoji, sub) => { setLbData({ cap, emoji, sub }); setLbOpen(true) }
  const closeLB = () => setLbOpen(false)

  const goSlide = useCallback((i) => {
    setCIdx(i)
    if (cTrackRef.current) cTrackRef.current.style.transform = `translateX(-${i * 100}%)`
  }, [])
  const cMove = useCallback((dir) => {
    setCIdx(prev => { const n = (prev + dir + slides) % slides; goSlide(n); return n })
  }, [goSlide])

  const handleSend = (e) => {
    const btn = e.currentTarget
    btn.textContent = 'Sending...'
    setTimeout(() => { btn.innerHTML = 'Message Sent ✓'; btn.style.background = 'linear-gradient(135deg,var(--g600),var(--g800))' }, 1400)
    setTimeout(() => { btn.innerHTML = 'Send Message →'; btn.style.background = '' }, 5000)
  }

  const filterCat = (cat) => { setActiveCat(cat) }

  useEffect(() => {
    const words = ['B.Tech CSE Student','Full Stack Developer','IOS Development Aspirant','Creative Thinker','Java DSA Programmer','Event Photographer']
    let wi = 0, ci = 0, del = false, mounted = true
    function type() {
      if (!mounted || !typedRef.current) return
      const w = words[wi]
      if (!del) { typedRef.current.textContent = w.slice(0, ci + 1); ci++; if (ci === w.length) { del = true; setTimeout(type, 1800); return } }
      else { typedRef.current.textContent = w.slice(0, ci - 1); ci--; if (ci === 0) { del = false; wi = (wi + 1) % words.length } }
      setTimeout(type, del ? 55 : 100)
    }
    type()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf
    const onMove = (e) => { mx = e.clientX; my = e.clientY; if (curRef.current) { curRef.current.style.left = mx + 'px'; curRef.current.style.top = my + 'px' } }
    function animate() { rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1; if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px' } raf = requestAnimationFrame(animate) }
    document.addEventListener('mousemove', onMove)
    animate()
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      if (scrollBarRef.current) scrollBarRef.current.style.width = pct + '%'

      document.querySelectorAll('.reveal,.tl-item').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('vis')
      })
    }
    window.addEventListener('scroll', onScroll)
    setTimeout(() => onScroll(), 150)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = setInterval(() => cMove(1), 4500)
    return () => clearInterval(id)
  }, [cMove])

  useEffect(() => {
    const els = document.querySelectorAll('a,button,.proj-card,.about-card,.m-item,.split-side')
    const enter = () => { if(curRef.current){curRef.current.style.width='4px';curRef.current.style.height='4px'} if(ringRef.current){ringRef.current.style.width='46px';ringRef.current.style.height='46px'} }
    const leave = () => { if(curRef.current){curRef.current.style.width='8px';curRef.current.style.height='8px'} if(ringRef.current){ringRef.current.style.width='34px';ringRef.current.style.height='34px'} }
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave) })
    return () => els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave) })
  })

  // ── GSAP ScrollTrigger animations for About section ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = aboutRef.current
      if (!section) return

      // ── Title letter-by-letter reveal ──
      const titleChars = section.querySelectorAll('.about-title-char')
      gsap.set(titleChars, { opacity: 0, y: 80, rotateX: -90 })
      gsap.to(titleChars, {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.8, stagger: 0.04, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
      })

      // ── Decorative line draw ──
      const decoLine = section.querySelector('.about-deco-line')
      if (decoLine) {
        gsap.set(decoLine, { scaleX: 0, transformOrigin: 'left center' })
        gsap.to(decoLine, {
          scaleX: 1, duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
        })
      }

      // ── Paragraph lines slide up ──
      const paragraphs = section.querySelectorAll('.about-lead')
      gsap.set(paragraphs, { opacity: 0, y: 50 })
      gsap.to(paragraphs, {
        opacity: 1, y: 0,
        duration: 0.9, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: paragraphs[0], start: 'top 85%', toggleActions: 'play none none reverse' }
      })

      // ── Chips pop-in with elastic bounce ──
      const chips = section.querySelectorAll('.chip')
      gsap.set(chips, { opacity: 0, scale: 0, rotation: -15 })
      gsap.to(chips, {
        opacity: 1, scale: 1, rotation: 0,
        duration: 0.6, stagger: 0.08, ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: section.querySelector('.about-chips'), start: 'top 85%', toggleActions: 'play none none reverse' }
      })

      // ── Contact items sequential fade ──
      const cqItems = section.querySelectorAll('.cq-item')
      gsap.set(cqItems, { opacity: 0, x: -30 })
      gsap.to(cqItems, {
        opacity: 1, x: 0,
        duration: 0.6, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: section.querySelector('.contact-quick'), start: 'top 90%', toggleActions: 'play none none reverse' }
      })

      // ── Cards stagger slide-in from right with 3D rotation ──
      const cards = section.querySelectorAll('.about-card')
      gsap.set(cards, { opacity: 0, x: 120, rotateY: -15 })
      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1, x: 0, rotateY: 0,
          duration: 0.8, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' }
        })
      })

      // ── Floating particles ambient effect ──
      const particles = section.querySelectorAll('.about-particle')
      particles.forEach((p, i) => {
        gsap.to(p, {
          y: `random(-60, 60)`, x: `random(-40, 40)`, opacity: gsap.utils.random(0.2, 0.6),
          duration: gsap.utils.random(3, 6), repeat: -1, yoyo: true,
          ease: 'sine.inOut', delay: i * 0.5
        })
      })

      // ── Section-level parallax on the giant background text ──
      const bgText = section.querySelector('.about-bg-text')
      if (bgText) {
        gsap.to(bgText, {
          x: -150, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 }
        })
      }

    }, aboutRef)

    return () => ctx.revert()
  }, [])


  return (
    <div className={dark ? 'dark' : ''}>
      <div id="cur" ref={curRef}></div>
      <div id="cur-ring" ref={ringRef}></div>
      <div id="scroll-bar" ref={scrollBarRef}></div>

      <nav id="nav">
        <div className="nav-logo">Madhav<span className="dot">.</span></div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#photography">Photography</a></li>
        </ul>
        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme}>{dark ? '☀️ Light' : '🌙 Dark'}</button>
        </div>
      </nav>

      <section id="hero">
        <div className="hero-inner">
          <div className="hero-meta">
            <span className="hero-line"></span>
            PORTFOLIO • 2025
          </div>
          <h1 className="hero-name">
            Madhav <span className="script-text">तिवारी</span>
          </h1>
          <div className="hero-bottom-row">
            <p className="hero-desc">
              Two crafts, one voice — engineering the invisible, capturing the moment.
            </p>
            <div className="hero-bottom-right">
              <div className="hero-location">
                <span className="loc-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <span>Dehradun, India</span>
              </div>
              <div className="hero-scroll-btn">
                <span>SCROLL</span>
                <span className="scroll-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" ref={aboutRef}>
        {/* Floating ambient particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="about-particle" style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
          }} />
        ))}
        {/* Giant parallax background text */}
        <div className="about-bg-text">ABOUT</div>
        {/* Title with split characters */}
        <div className="about-title-wrap">
          <h2 className="section-title">
            {'Who I '.split('').map((ch, i) => (
              <span key={i} className="about-title-char">{ch === ' ' ? '\u00A0' : ch}</span>
            ))}
            <em>
              {'Am'.split('').map((ch, i) => (
                <span key={`em-${i}`} className="about-title-char">{ch}</span>
              ))}
            </em>
          </h2>
          <div className="about-deco-line"></div>
        </div>
        <div className="about-grid">
          <div>
            <p className="about-lead">I'm <strong>Madhav Tiwari</strong>, a 2nd-year B.Tech CSE student from Delhi, currently studying at <strong>UPES, Dehradun</strong>. I sit at the intersection of <strong>Full Stack</strong> development, and creative <strong>Photography</strong>.</p>
            <p className="about-lead" style={{marginBottom:'1.8rem'}}>I love breaking problems down — whether it's algorithmic challenges in <strong>Java</strong>, building scalable web apps with <strong>React &amp; Node.js</strong>, or understanding how systems can be secured from the ground up.</p>
            <div className="about-chips">
              <span className="chip">&#128187; Full Stack Dev</span>
              <span className="chip">&#128274; IOS Development</span>
              <span className="chip">&#128172; DSA · Java</span>
              <span className="chip">&#127757; Open Source</span>
              <span className="chip">&#128247; Photography</span>
              <span className="chip">&#127908; Media Coverage</span>
            </div>
            <div className="contact-quick">
              <div className="cq-item"><span className="cq-icon">&#128205;</span> Pune, Maharashtra</div>
              <div className="cq-item"><span className="cq-icon">&#128222;</span> +91-7856806464</div>
              <div className="cq-item"><span className="cq-icon">&#9993;</span> <a href="mailto:madhavtiwari.college@gmail.com">madhavtiwari.college@gmail.com</a></div>
            </div>
          </div>
          <div className="about-cards">
            <div className="about-card">
              <div className="ac-header"><div className="ac-icon">&#127979;</div><div className="ac-title">Education</div></div>
              <div className="ac-sub">UPES, Dehradun · 2024–Present</div>
              <div className="ac-body">B.Tech Computer Science Engineering</div>
            </div>
            <div className="about-card">
              <div className="ac-header"><div className="ac-icon">&#127891;</div><div className="ac-title">Academic Background</div></div>
              <div className="ac-sub">CBSE · Pune</div>
              <div className="ac-body">Class 12th: 75% &nbsp;|&nbsp; Class 10th: 89%</div>
            </div>
            <div className="about-card">
              <div className="ac-header"><div className="ac-icon">&#128251;</div><div className="ac-title">Career Goal</div></div>
              <div className="ac-sub">Aspiring IOS Development + Full Stack Developer</div>
              <div className="ac-body">Building secure, scalable web applications with a deep understanding of how systems work — and how they can be protected.</div>
            </div>
            <div className="about-card">
              <div className="ac-header"><div className="ac-icon">&#127919;</div><div className="ac-title">Interests</div></div>
              <div className="ac-sub">What drives me</div>
              <div className="ac-body">DSA · Web Development · Event Photography</div>
            </div>
          </div>
        </div>
      </section>

      <div id="split-chooser" className="reveal">
        <a href="#skills" className="split-side split-left">
          <div className="split-bg"></div>
          <div className="split-content">
            <div className="split-comp">💻</div>
            <h2 className="split-title">Technical</h2>
            <div className="split-sub">FULL STACK · IOS DEV · DSA</div>
            <div className="split-arrow">→</div>
          </div>
        </a>
        <div className="split-divider">
          <div className="split-line"></div>
          <div className="split-badge">or</div>
        </div>
        <a href="#photography" className="split-side split-right">
          <div className="split-bg"></div>
          <div className="split-content">
            <div className="split-cam">📷</div>
            <h2 className="split-title">Creative</h2>
            <div className="split-sub">CONCERTS · EVENTS · PORTRAITS</div>
            <div className="split-arrow">→</div>
          </div>
        </a>
      </div>

      <section id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="skills-marquee-container">
          <div className="skills-marquee-inner">
            <span className="skills-marquee-text">create build deploy &nbsp;·&nbsp; </span>
            <span className="skills-marquee-text">create build deploy &nbsp;·&nbsp; </span>
            <span className="skills-marquee-text">create build deploy &nbsp;·&nbsp; </span>
            <span className="skills-marquee-text">create build deploy &nbsp;·&nbsp; </span>
          </div>
        </div>
        <div className="toolkit-orbit-wrap reveal">
          <img src="/images/toolkit-base-new.png" alt="Madhav Base" className="toolkit-base-img" />
          <div className="toolkit-orbit">
            {[
              'html5/html5-original.svg',
              'css3/css3-original.svg',
              'javascript/javascript-original.svg',
              'react/react-original.svg',
              'nodejs/nodejs-original.svg',
              'java/java-original.svg',
              'python/python-original.svg',
              'swift/swift-original.svg',
              'git/git-original.svg',
              'github/github-original.svg',
              'mysql/mysql-original.svg',
              'mongodb/mongodb-original.svg',
              'docker/docker-original.svg'
            ].map((icon, i, arr) => (
              <div 
                className="orbit-item" 
                key={i} 
                style={{ transform: `rotate(${(360 / arr.length) * i}deg) translateY(var(--orbit-radius)) rotate(-${(360 / arr.length) * i}deg)` }}
              >
                <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`} alt="skill" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="glass-blob blob-1"></div>
        <div className="glass-blob blob-2"></div>
        <div className="reveal" style={{ position: 'relative', zIndex: 2 }}><h2 className="section-title">Things I've <em>Built</em></h2></div>
        <div className="projects-grid" style={{ position: 'relative', zIndex: 2 }}>
          <div className="proj-card reveal">
            <div className="project-thumb pt2" style={{height:140,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" style={{height:'50px',width:'auto'}} />
            </div>
            <div className="proj-body">
              <div className="proj-title">Inventory Management</div>
              <div className="proj-desc">Interactive data structures and algorithms visualizer — sorting, graph traversals, trees. Built to reinforce Java DSA concepts visually.</div>
              <div className="proj-tags"><span className="proj-tag">Swing</span><span className="proj-tag">Java</span></div>
              <div className="proj-links"><a href="#" className="plb plb-solid">&#9654; Live Demo</a><a href="#" className="plb plb-ghost">&#10140; GitHub</a></div>
            </div>
          </div>
          <div className="proj-card reveal">
            <div className="project-thumb pt3" style={{height:140,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" style={{height:'50px',width:'auto'}} />
            </div>
            <div className="proj-body">
              <div className="proj-title">Finance Tracker</div>
              <div className="proj-desc">Internal web portal for UPES Debating Society — event documentation, media gallery, and announcement management system.</div>
              <div className="proj-tags"><span className="proj-tag">React</span><span className="proj-tag">CSS</span><span className="proj-tag">Javascript</span></div>
              <div className="proj-links"><a href="#" className="plb plb-solid">&#9654; Live Demo</a><a href="#" className="plb plb-ghost">&#10140; GitHub</a></div>
            </div>
          </div>
          <div className="proj-card reveal">
            <div className="project-thumb pt4" style={{height:140,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg" alt="Swift" style={{height:'50px',width:'auto'}} />
            </div>
            <div className="proj-body">
              <div className="proj-title">E-Commerce Website</div>
              <div className="proj-desc">A responsive photography portfolio showcasing concert, street, and event photography. Masonry grid, lightbox, and category filtering.</div>
              <div className="proj-tags"><span className="proj-tag">Swift</span><span className="proj-tag">Swift</span></div>
              <div className="proj-links"><a href="#" className="plb plb-solid">&#9654; Live Demo</a><a href="#" className="plb plb-ghost">&#10140; GitHub</a></div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="reveal"><div className="section-tag">Experience &amp; Achievements</div><h2 className="section-title">The <em>Journey</em></h2></div>
        <div className="timeline">
          <div className="tl-item"><div className="tl-dot"></div><div className="tl-tag">Internship</div><div className="tl-date">June 2024 – July 2024</div><div className="tl-title">Intern — Child Help Foundation</div><div className="tl-org">Non-Profit · Remote</div><div className="tl-desc">Contributed to technology and outreach initiatives for a social-impact organisation, gaining real-world professional experience in a collaborative environment.</div></div>
          <div className="tl-item"><div className="tl-dot"></div><div className="tl-tag">Leadership</div><div className="tl-date">2024 – Present</div><div className="tl-title">Head of Media — Prayudh Debating Society</div><div className="tl-org">UPES, Dehradun</div><div className="tl-desc">Led all media coverage, event documentation and design for one of UPES's most active student societies. Managed photography, videography and digital content pipelines for multiple events.</div></div>
          <div className="tl-item"><div className="tl-dot"></div><div className="tl-tag">Photography</div><div className="tl-date">2024 – 2025</div><div className="tl-title">Event Photographer — Major Concerts &amp; Festivals</div><div className="tl-org">Pratibimb Photography Club · UPES</div><div className="tl-desc">Official coverage for Papon Concert 2025, Virasat 2024, UKTI Literature Fest 2025, and Doon Comedy Festival 2025. Member of Pratibimb Photography Club.</div><div><span className="tl-badge">&#127928; Papon Concert 2025</span> <span className="tl-badge">&#127775; Virasat 2024</span> <span className="tl-badge">&#128214; UKTI Lit Fest 2025</span></div></div>
          <div className="tl-item"><div className="tl-dot"></div><div className="tl-tag">Certification · In Progress</div><div className="tl-date">2024 – Present</div><div className="tl-title">Full-Stack Web Development Specialization</div><div className="tl-org">Coursera · HKUST</div><div className="tl-desc">Comprehensive program covering React, Node.js, databases, REST APIs, and deployment — completing hands-on capstone projects throughout.</div></div>
          <div className="tl-item"><div className="tl-dot"></div><div className="tl-tag">Academic</div><div className="tl-date">2024 – Present</div><div className="tl-title">B.Tech CSE · UPES Dehradun</div><div className="tl-org">CGPA: 7 after 1st Year</div><div className="tl-desc">Strong foundation in programming, data structures, algorithms, and computer science fundamentals. Active in campus extracurriculars.</div></div>
        </div>
      </section>

      <section id="contact">
        <div className="reveal"><div className="section-tag">Get In Touch</div><h2 className="section-title">Let's <em>Connect</em></h2></div>
        <div className="contact-grid">
          <div className="contact-left reveal">
            <h3>Open to Collaborations &amp; Internships</h3>
            <p>Whether you want to collaborate on a project, discuss IOS development, or just want to say hello — my inbox is open. I'm especially keen on opportunities in full-stack development and security.</p>
            <div className="social-links">
              <a href="#" className="soc-link"><span className="soc-icon">in</span> linkedin.com/in/madhavtiwari</a>
              <a href="#" className="soc-link"><span className="soc-icon">&#9671;</span> github.com/madhavtiwari</a>
              <a href="#" className="soc-link"><span className="soc-icon">&#128247;</span> @maddywithalens</a>
              <a href="mailto:madhavtiwari.college@gmail.com" className="soc-link"><span className="soc-icon">&#9993;</span> madhavtiwari.college@gmail.com</a>
              <a href="tel:+917856806464" className="soc-link"><span className="soc-icon">&#128222;</span> +91-7856806464</a>
            </div>
          </div>
          <div className="form reveal">
            <div className="fg"><label>Your Name</label><input type="text" className="finput" placeholder="XYZ" /></div>
            <div className="fg"><label>Email Address</label><input type="email" className="finput" placeholder="XYZ@example.com" /></div>
            <div className="fg"><label>Message</label><textarea className="ftextarea" placeholder="Hey Madhav, I'd love to collaborate on..."></textarea></div>
            <button className="fsend" onClick={handleSend}>Send Message &#10140;</button>
          </div>
        </div>
      </section>

      <section id="photography" style={{background:'var(--g900)',paddingTop:'4rem',paddingBottom:'4rem'}}>
        <div className="reveal" style={{textAlign:'center',marginBottom:'2rem'}}>
          <div className="section-tag" style={{color:'var(--g400)'}}>&#128247; Photography</div>
          <h2 className="section-title" style={{color:'var(--off)'}}>Visual Storytelling<br/><em>Through the Lens</em></h2>
          <p style={{color:'rgba(238,238,238,0.6)',maxWidth:600,margin:'1rem auto 0',lineHeight:1.8,fontSize:'.95rem'}}>Drag and spin the interactive WebGL globe to explore my visual journeys across concerts, cultural festivals, literary events, comedy shows, and street photography.</p>
        </div>
        <div style={{ height: '600px', position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <InfiniteMenu items={[
            { image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600', link: '#', title: 'Concert Photography', description: 'Raw energy captured in low light' },
            { image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600', link: '#', title: 'Cultural Festivals', description: 'Heritage meets modern celebration' },
            { image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600', link: '#', title: 'Literary Events', description: 'Capturing the power of words' },
            { image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600', link: '#', title: 'Comedy Shows', description: 'The art of the punchline' },
            { image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600', link: '#', title: 'Street & Portraits', description: 'Candid moments, real stories' }
          ]} />
        </div>
      </section>

      {/* Lightbox */}
      <div id="lb" className={lbOpen?'open':''} onClick={closeLB}>
        <button className="lb-close" onClick={closeLB}>&#10005;</button>
        <div className="lb-inner" onClick={e=>e.stopPropagation()}>
          <div className="lb-box" style={{background:'linear-gradient(135deg,var(--g900),var(--g600) 200%)'}}>{lbData.emoji}</div>
          <div className="lb-cap">{lbData.cap}</div>
          <div className="lb-sub">{lbData.sub}</div>
        </div>
      </div>

      <footer>
        <div>&#169; 2025 <a href="#">Madhav Tiwari</a> · Crafted with passion in Dehradun</div>
        <div>B.Tech CSE · UPES · IOS Development &amp; Full Stack</div>
      </footer>
    </div>
  )
}

export default App
