import sys

def replace_lines(filepath, start, end, new_content):
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    start_idx = start - 1
    end_idx = end
    
    lines[start_idx:end_idx] = [new_content + '\n']
    
    with open(filepath, 'w') as f:
        f.writelines(lines)

jsx_new = """      <div id="split-chooser" className="reveal">
        <a href="#skills" className="split-side split-left">
          <div className="split-bg"></div>
          <div className="split-content">
            <h2 className="split-title">Technical</h2>
            <div className="split-code">
              <div>const dev = new Developer();</div>
              <div>dev.stack = ['React', 'Node', 'Java'];</div>
              <div>dev.build().deploy();</div>
            </div>
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
      </div>"""

css_new = """/* ── SPLIT CHOOSER ── */
#split-chooser {
  display: flex;
  width: 100vw;
  height: 100vh;
  min-height: 500px;
  max-height: 900px;
  margin-left: calc(-50vw + 50%);
  background: #022c22;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(16, 185, 129, 0.1);
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
}
.split-side {
  flex: 1;
  position: relative;
  text-decoration: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: flex 0.7s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: none;
}
.split-side:hover {
  flex: 1.4;
}
.split-bg {
  position: absolute;
  inset: 0;
  transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s;
}
.split-side::before {
  content:'';
  position:absolute;
  inset:0;
  background-image:radial-gradient(circle,rgba(74,222,128,.05) 1px,transparent 1px);
  background-size:26px 26px;
  z-index:1;
  opacity: 0.8;
}
.split-left .split-bg {
  background: linear-gradient(135deg, #022c22 0%, #064e3b 100%);
}
.split-right .split-bg {
  background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
}
.split-side:hover .split-bg {
  transform: scale(1.05);
}
.split-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1);
}
.split-side:hover .split-content {
  transform: scale(1.03);
}
.split-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3.5rem, 7vw, 6rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -2px;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: color 0.4s;
}
.split-side:hover .split-title {
  color: var(--white);
}

/* Left specific */
.split-code {
  position: absolute;
  bottom: -40vh;
  left: 2rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: rgba(16, 185, 129, 0.3);
  line-height: 1.6;
  text-align: left;
  z-index: 2;
  transition: color 0.4s, opacity 0.4s, bottom 0.7s cubic-bezier(0.25, 1, 0.5, 1);
  opacity: 0;
}
.split-left:hover .split-code {
  color: var(--g400);
  opacity: 1;
  bottom: 2rem;
}

/* Right specific */
.split-sub {
  margin-top: 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: var(--g300);
  text-transform: uppercase;
  opacity: 0.8;
}
.split-arrow {
  margin-top: 1.8rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(16, 185, 129, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--g300);
  transition: all 0.4s;
}
.split-right:hover .split-arrow {
  background: var(--g600);
  border-color: var(--g600);
  color: #fff;
  transform: translateX(8px);
}
.split-cam {
  position: absolute;
  top: -10vh;
  right: 3rem;
  font-size: 2.5rem;
  opacity: 0;
  filter: grayscale(100%);
  transition: opacity 0.4s, filter 0.4s, transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), top 0.7s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 2;
}
.split-right:hover .split-cam {
  opacity: 0.6;
  filter: grayscale(0%);
  transform: rotate(15deg);
  top: 3rem;
}

/* Divider */
.split-divider {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 3;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.split-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.4), transparent);
}
.split-badge {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #022c22;
  border: 1px solid rgba(16, 185, 129, 0.4);
  color: var(--g400);
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  font-family: 'JetBrains Mono', monospace;
}

@media(max-width: 768px) {
  #split-chooser {
    flex-direction: column;
    height: 100vh;
  }
  .split-side:hover {
    flex: 1.1;
  }
  .split-divider {
    left: 0;
    right: 0;
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
  }
  .split-line {
    top: 50%;
    left: 0;
    right: 0;
    bottom: auto;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(16, 185, 129, 0.4), transparent);
  }
  .split-code, .split-cam {
    display: none;
  }
}"""

replace_lines('src/App.jsx', 145, 182, jsx_new)
replace_lines('src/App.css', 228, 380, css_new)

print("Done")
