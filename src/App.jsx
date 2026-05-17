import { useState, useEffect, useRef, useCallback } from 'react'

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
    setTimeout(() => { btn.innerHTML = 'Message Sent ✓'; btn.style.background = 'linear-gradient(135deg,#059669,#047857)' }, 1400)
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
      document.querySelectorAll('.skill-fill').forEach(el => {
        if (!el.style.width || el.style.width === '0%') {
          const rect = el.closest('.skill-panel')?.getBoundingClientRect()
          if (rect && rect.top < window.innerHeight * 0.88) el.style.width = el.dataset.w + '%'
        }
      })
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
          <h1 className="hero-name">Madhav <em className="accent">Tiwari</em></h1>
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

      <div className="section-divider"></div>

      <section id="about">
        <div className="reveal">
          <div className="section-tag">About Me</div>
          <h2 className="section-title">Who I <em>Am</em></h2>
        </div>
        <div className="about-grid">
          <div className="reveal">
            <p className="about-lead">Hey! I'm <strong>Madhav Tiwari</strong>, a 2nd-year B.Tech CSE student from Pune, currently studying at <strong>UPES, Dehradun</strong>. I sit at the intersection of <strong>Full Stack</strong> development, and creative <strong>Photography</strong>.</p>
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
              <div className="ac-body">Class 12th: 75% &nbsp;|&nbsp; Class 10th: 88%</div>
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

      <div className="section-divider"></div>

      <section id="skills">
        <div className="reveal">
          <div className="section-tag">Technical Skills</div>
          <h2 className="section-title">My <em>Toolkit</em></h2>
        </div>
        <div className="skills-outer">
          <div className="skill-panel reveal">
            <h3>&#9672; Web Development</h3>
            {[['HTML & CSS',85],['JavaScript',75],['React.js',68],['Node.js',55]].map(([n,p])=>(
              <div className="skill-row" key={n}><div className="skill-info"><span className="skill-name">{n}</span><span className="skill-pct">{p}%</span></div><div className="skill-track"><div className="skill-fill" data-w={p}></div></div></div>
            ))}
          </div>
          <div className="skill-panel reveal">
            <h3>&#9672; Programming Languages</h3>
            {[['Java (DSA-focused)',80],['Python (basics)',65],['Swift',60],['SQL',65]].map(([n,p])=>(
              <div className="skill-row" key={n}><div className="skill-info"><span className="skill-name">{n}</span><span className="skill-pct">{p}%</span></div><div className="skill-track"><div className="skill-fill" data-w={p}></div></div></div>
            ))}
          </div>
          <div className="skill-panel reveal">
            <h3>&#9672; Tools &amp; Databases</h3>
            {[['Git & GitHub',78],['MySQL & MongoDB',65],['VS Code · IntelliJ · Postman',80],['Docker (basic)',40]].map(([n,p])=>(
              <div className="skill-row" key={n}><div className="skill-info"><span className="skill-name">{n}</span><span className="skill-pct">{p}%</span></div><div className="skill-track"><div className="skill-fill" data-w={p}></div></div></div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="projects">
        <div className="reveal"><div className="section-tag">Projects</div><h2 className="section-title">Things I've <em>Built</em></h2></div>
        <div className="projects-grid">
          <div className="proj-card reveal">
            <div className="project-thumb pt2" style={{height:140,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'3rem'}}>&#127758;</div>
            <div className="proj-body">
              <div className="proj-title">DSA Visualizer</div>
              <div className="proj-desc">Interactive data structures and algorithms visualizer — sorting, graph traversals, trees. Built to reinforce Java DSA concepts visually.</div>
              <div className="proj-tags"><span className="proj-tag">HTML</span><span className="proj-tag">CSS</span><span className="proj-tag">JavaScript</span><span className="proj-tag">Java</span></div>
              <div className="proj-links"><a href="#" className="plb plb-solid">&#9654; Live Demo</a><a href="#" className="plb plb-ghost">&#10140; GitHub</a></div>
            </div>
          </div>
          <div className="proj-card reveal">
            <div className="project-thumb pt3" style={{height:140,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'3rem'}}>&#128197;</div>
            <div className="proj-body">
              <div className="proj-title">Prayudh Media Portal</div>
              <div className="proj-desc">Internal web portal for UPES Debating Society — event documentation, media gallery, and announcement management system.</div>
              <div className="proj-tags"><span className="proj-tag">React</span><span className="proj-tag">CSS</span><span className="proj-tag">Firebase</span></div>
              <div className="proj-links"><a href="#" className="plb plb-solid">&#9654; Live Demo</a><a href="#" className="plb plb-ghost">&#10140; GitHub</a></div>
            </div>
          </div>
          <div className="proj-card reveal">
            <div className="project-thumb pt4" style={{height:140,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'3rem'}}>&#128247;</div>
            <div className="proj-body">
              <div className="proj-title">ConcertLens — Photo Portfolio</div>
              <div className="proj-desc">A responsive photography portfolio showcasing concert, street, and event photography. Masonry grid, lightbox, and category filtering.</div>
              <div className="proj-tags"><span className="proj-tag">HTML</span><span className="proj-tag">CSS Grid</span><span className="proj-tag">JavaScript</span></div>
              <div className="proj-links"><a href="#" className="plb plb-solid">&#9654; Live Demo</a><a href="#" className="plb plb-ghost">&#10140; GitHub</a></div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

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

      <div className="section-divider"></div>

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

      <div style={{background:'linear-gradient(180deg,var(--white),var(--g900))',height:80}}></div>

      <section id="photography" style={{background:'#0a1a10',paddingTop:'4rem'}}>
        <div className="photo-hero-band reveal">
          <div className="photo-hero-inner">
            <div className="photo-hero-tag">&#128247; Photography</div>
            <div className="photo-hero-title">Visual Storytelling<br/><em>Through the Lens</em></div>
            <p className="photo-hero-body">My photography is shaped by the energy of the artists I've covered. From the raw, moody light of <strong>Papon's concert</strong> to the cultural grandeur of <strong>Virasat</strong> and the spoken-word electricity of <strong>UKTI Lit Fest</strong> — every frame is a search for the decisive moment. I shoot <strong>cinematic, emotional, and raw</strong>. No posed perfection — only honest light.</p>
          </div>
        </div>
        <div style={{color:'#ecfdf5'}}>
          <div className="section-tag" style={{color:'var(--g400)',marginBottom:'.8rem'}}>Artist-Inspired Work</div>
          <h2 className="section-title" style={{color:'#ecfdf5',marginBottom:'2.5rem'}}>Events <em>Covered</em></h2>
        </div>

        {/* Artist 1 */}
        <div className="artist-section reveal">
          <div className="artist-header" style={{background:'rgba(255,255,255,0.04)',borderColor:'rgba(74,222,128,0.15)'}}>
            <div className="artist-num">01</div>
            <div className="artist-info">
              <h3 style={{color:'#ecfdf5'}}>Javed Ali — Concert 2025</h3>
              <span className="artist-style-tag">Concert · Emotional · Low-Light Mastery</span>
              <p style={{color:'rgba(255,255,255,.55)'}}>Javed Ali's performances are cinematic — long, moody exposures, stage fog, and raw emotional connection between artist and audience. Capturing his concerts demands patience for the perfect light burst and anticipation of musical peaks.</p>
            </div>
          </div>
          <div className="masonry">
            {[['Stage Fog','🎤','Concert · Javed Ali 2025',200,'#022c22','#0f2419'],['Crowd Surge','🎵','Concert · Javed Ali 2025',150,'#065f46','#022c22'],['Spotlight Moment','🌟','Concert · Javed Ali 2025',180,'#0f2419','#059669 200%'],['Hands Up','🙌','Concert · Javed Ali 2025',170,'#022c22','#10b981 200%'],['Silhouette','🎶','Concert · Javed Ali 2025',140,'#0a1f13','#065f46'],['Green Haze','🎸','Concert · Javed Ali 2025',190,'#022c22','#4ade80 250%']].map(([label,emoji,sub,h,c1,c2])=>(
              <div className="m-item" key={label} onClick={()=>openLB(label,emoji,sub)}>
                <div className="m-placeholder" style={{height:h,background:`linear-gradient(135deg,${c1},${c2})`}}>{emoji}</div>
                <div className="m-green-tint"></div><div className="m-overlay"><div className="m-label">{label}</div></div>
              </div>
            ))}
          </div>
        </div>

        {/* Artist 2 */}
        <div className="artist-section reveal">
          <div className="artist-header" style={{background:'rgba(255,255,255,0.04)',borderColor:'rgba(74,222,128,0.15)'}}>
            <div className="artist-num">02</div>
            <div className="artist-info">
              <h3 style={{color:'#ecfdf5'}}>Virasat — Cultural Fest 2024</h3>
              <span className="artist-style-tag">Cultural · Heritage · Vibrant Portraits</span>
              <p style={{color:'rgba(255,255,255,.55)'}}>Virasat is a celebration of Indian heritage — folk art, classical performances, and vibrant colour. My approach here shifts to wider compositions, cultural portraiture, and the rich textures of tradition meeting modernity on a Dehradun campus.</p>
            </div>
          </div>
          <div className="masonry">
            {[['Folk Dance','💃','Cultural · Virasat 2024',165,'#0f2419','#22c55e 200%'],['Heritage Portrait','🪔','Cultural · Virasat 2024',210,'#022c22','#065f46'],['Crowd Energy','🏮','Cultural · Virasat 2024',155,'#0a1f13','#10b981']].map(([label,emoji,sub,h,c1,c2])=>(
              <div className="m-item" key={label} onClick={()=>openLB(label,emoji,sub)}>
                <div className="m-placeholder" style={{height:h,background:`linear-gradient(135deg,${c1},${c2})`}}>{emoji}</div>
                <div className="m-green-tint"></div><div className="m-overlay"><div className="m-label">{label}</div></div>
              </div>
            ))}
          </div>
        </div>

        {/* Artist 3 */}
        <div className="artist-section reveal">
          <div className="artist-header" style={{background:'rgba(255,255,255,0.04)',borderColor:'rgba(74,222,128,0.15)'}}>
            <div className="artist-num">03</div>
            <div className="artist-info">
              <h3 style={{color:'#ecfdf5'}}>UKTI Literature Fest 2025</h3>
              <span className="artist-style-tag">Literary · Intimate · Street-Style Candids</span>
              <p style={{color:'rgba(255,255,255,.55)'}}>Literature festivals demand a different eye — quiet concentration, gestural body language, the micro-expressions of thinkers mid-thought. Shooting UKTI Lit Fest meant hunting for candid intimacy, panel depth, and the electric charge of a poem landing right.</p>
            </div>
          </div>
          <div className="masonry">
            {[['Speaker Intensity','📖','Literary · UKTI 2025',185,'#022c22','#059669 180%'],['Panel Discussion','🎙️','Literary · UKTI 2025',145,'#0f2419','#4ade80 250%'],['Audience Candid','✍️','Literary · UKTI 2025',170,'#065f46','#022c22']].map(([label,emoji,sub,h,c1,c2])=>(
              <div className="m-item" key={label} onClick={()=>openLB(label,emoji,sub)}>
                <div className="m-placeholder" style={{height:h,background:`linear-gradient(135deg,${c1},${c2})`}}>{emoji}</div>
                <div className="m-green-tint"></div><div className="m-overlay"><div className="m-label">{label}</div></div>
              </div>
            ))}
          </div>
        </div>

        {/* Artist 4 */}
        <div className="artist-section reveal">
          <div className="artist-header" style={{background:'rgba(255,255,255,0.04)',borderColor:'rgba(74,222,128,0.15)'}}>
            <div className="artist-num">04</div>
            <div className="artist-info">
              <h3 style={{color:'#ecfdf5'}}>Doon Comedy Festival 2025</h3>
              <span className="artist-style-tag">Stand-Up · Dynamic · Expressive Portraits</span>
              <p style={{color:'rgba(255,255,255,.55)'}}>Comedy photography is all about timing — that fraction of a second when the punchline lands and the performer's face is pure electricity. Fast shutter speeds, single-light drama, and chasing the authentic laugh.</p>
            </div>
          </div>
          <div className="masonry">
            {[['The Punchline','😂','Comedy · Doon 2025',175,'#022c22','#86efac 250%'],['Mic Drop','🎤','Comedy · Doon 2025',200,'#0a1f13','#22c55e 200%'],['Laughter Row','🤣','Comedy · Doon 2025',155,'#065f46','#0f2419']].map(([label,emoji,sub,h,c1,c2])=>(
              <div className="m-item" key={label} onClick={()=>openLB(label,emoji,sub)}>
                <div className="m-placeholder" style={{height:h,background:`linear-gradient(135deg,${c1},${c2})`}}>{emoji}</div>
                <div className="m-green-tint"></div><div className="m-overlay"><div className="m-label">{label}</div></div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="carousel-wrap reveal">
          <div className="section-tag" style={{color:'var(--g400)',marginBottom:'.8rem'}}>Featured Work</div>
          <h2 className="section-title" style={{color:'#ecfdf5',marginBottom:'1.5rem'}}>Best <em>Frames</em></h2>
          <div className="photo-cats">
            {['all','concert','portrait','street'].map(c=>(
              <button key={c} className={`pcat${activeCat===c?' on':''}`} onClick={()=>filterCat(c)}>{c==='all'?'All':c==='concert'?'Concerts':c==='portrait'?'Portraits':'Street & Events'}</button>
            ))}
          </div>
          <div className="carousel-track-wrap" style={{position:'relative'}}>
            <div className="c-track" ref={cTrackRef}>
              <div className="c-slide cs1" data-cap="Papon Concert 2025 — Stage Fog & Green Light">🎤</div>
              <div className="c-slide cs2" data-cap="Virasat 2024 — Folk Heritage Portrait">💃</div>
              <div className="c-slide cs3" data-cap="UKTI Literature Fest 2025 — Speaker Intensity">📖</div>
              <div className="c-slide cs4" data-cap="Doon Comedy Festival 2025 — The Punchline">😂</div>
            </div>
            <div className="c-controls">
              <button className="c-btn" onClick={()=>cMove(-1)}>&#8249;</button>
              <button className="c-btn" onClick={()=>cMove(1)}>&#8250;</button>
            </div>
          </div>
          <div className="c-dots">
            {[0,1,2,3].map(i=>(
              <div key={i} className={`cdot${cIdx===i?' on':''}`} onClick={()=>goSlide(i)}></div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div id="lb" className={lbOpen?'open':''} onClick={closeLB}>
        <button className="lb-close" onClick={closeLB}>&#10005;</button>
        <div className="lb-inner" onClick={e=>e.stopPropagation()}>
          <div className="lb-box" style={{background:'linear-gradient(135deg,#022c22,#10b981 200%)'}}>{lbData.emoji}</div>
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
