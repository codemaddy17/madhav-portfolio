import { useState, useEffect, useRef, useCallback } from 'react'
import InfiniteMenu from './InfiniteMenu'

function App() {
  const [dark, setDark] = useState(false)
  const [lbOpen, setLbOpen] = useState(false)
  const [lbData, setLbData] = useState({ cap: '', emoji: '', sub: '' })
  const [cIdx, setCIdx] = useState(0)
  const [activeCat, setActiveCat] = useState('all')
  const typedRef = useRef(null)
  const curRef = useRef(null)
  const ringRef = useRef(null)
  const scrollBarRef = useRef(null)
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
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
        <div className="hero-grid"></div>
        <div className="hero-photo-panel">
          <img src="/images/hero-photo.jpg" alt="Madhav Tiwari" />
        </div>
        <div className="hero-photo-fade"></div>
        <div className="hero-content">
          <div className="hero-eyebrow"><span className="eyebrow-dot"></span> Open to Internships &amp; Opportunities</div>
          <h1 className="hero-name">Madhav <em className="accent hindi-name">तिवारी</em></h1>
          <div className="hero-typed-wrap">
            <span className="typed-prefix">I'm a</span>
            <span className="hero-typed" ref={typedRef}></span><span className="cursor-blink">|</span>
          </div>
          <p className="hero-sub">B.Tech CSE student at <strong>UPES, Dehradun</strong> — aspiring <strong>IOS Development</strong> &amp; <strong>Full Stack Developer</strong>. I build secure, scalable web applications and capture stories through a camera lens.</p>
          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary">&#9654; View Projects</a>
            <a href="#" className="btn btn-outline">&#8659; Resume </a>
            <a href="#contact" className="btn btn-outline">&#9993; Contact Me</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><div className="stat-num">5+</div><div className="stat-label">Certifications</div></div>
            <div className="stat"><div className="stat-num">20+</div><div className="stat-label">Events Covered</div></div>
          </div>
        </div>
        <div className="hero-scroll"><div className="scroll-track"></div>scroll</div>
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

      <section id="about">
        <div className="reveal">
          <h2 className="section-title">Who I <em>Am</em></h2>
        </div>
        <div className="about-grid">
          <div className="reveal">
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
          <div className="about-cards reveal">
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

      <section id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="giant-bg-text">INNOVATE</div>
        <div className="toolkit-orbit-wrap reveal">
          <img src="/images/toolkit-base.png" alt="Madhav Base" className="toolkit-base-img" />
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
            <div className="project-thumb pt2" style={{height:140,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'3rem'}}>&#127758;</div>
            <div className="proj-body">
              <div className="proj-title">Inventory Management</div>
              <div className="proj-desc">Interactive data structures and algorithms visualizer — sorting, graph traversals, trees. Built to reinforce Java DSA concepts visually.</div>
              <div className="proj-tags"><span className="proj-tag">Swing</span><span className="proj-tag">Java</span></div>
              <div className="proj-links"><a href="#" className="plb plb-solid">&#9654; Live Demo</a><a href="#" className="plb plb-ghost">&#10140; GitHub</a></div>
            </div>
          </div>
          <div className="proj-card reveal">
            <div className="project-thumb pt3" style={{height:140,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'3rem'}}>&#128197;</div>
            <div className="proj-body">
              <div className="proj-title">Finance Tracker</div>
              <div className="proj-desc">Internal web portal for UPES Debating Society — event documentation, media gallery, and announcement management system.</div>
              <div className="proj-tags"><span className="proj-tag">React</span><span className="proj-tag">CSS</span><span className="proj-tag">Javascript</span></div>
              <div className="proj-links"><a href="#" className="plb plb-solid">&#9654; Live Demo</a><a href="#" className="plb plb-ghost">&#10140; GitHub</a></div>
            </div>
          </div>
          <div className="proj-card reveal">
            <div className="project-thumb pt4" style={{height:140,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'3rem'}}>&#128247;</div>
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
          <div className="tl-item"><div className="tl-dot"></div><div className="tl-tag">Academic</div><div className="tl-date">2024 – Present</div><div className="tl-title">B.Tech CSE · UPES Dehradun</div><div className="tl-org">CGPA: 6.95 after 1st Year</div><div className="tl-desc">Strong foundation in programming, data structures, algorithms, and computer science fundamentals. Active in campus extracurriculars.</div></div>
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
              <a href="#" className="soc-link"><span className="soc-icon">&#128247;</span> @madhav_frames</a>
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

      <section id="photography" style={{background:'var(--g900)', padding: 0, margin: 0, height: '100vh', width: '100%', position: 'relative', overflow: 'hidden'}}>
        {/* Floating Minimalist HUD Overlay */}
        <div style={{
          position: 'absolute',
          top: '3rem',
          left: '3rem',
          zIndex: 10,
          pointerEvents: 'none',
          maxWidth: '450px'
        }}>
          <div className="section-tag" style={{color:'var(--g400)', marginBottom: '0.5rem'}}>&#128247; Photography</div>
          <h2 className="section-title" style={{color:'var(--off)', fontSize: '2.5rem', lineHeight: 1.2, margin: 0}}>
            Visual <em>Storytelling</em>
          </h2>
          <p style={{color:'rgba(238,238,238,0.5)', margin:'1rem 0 0', lineHeight: 1.6, fontSize:'.9rem'}}>
            Drag and spin the interactive WebGL globe to explore my visual journeys across concerts, cultural festivals, literary events, comedy shows, and street photography.
          </p>
        </div>

        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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
