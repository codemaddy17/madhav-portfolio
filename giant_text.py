with open("src/App.css", "r") as f:
    css = f.read()

bg_text_css = """
/* ── GIANT BG TEXT ── */
.giant-bg-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20vw;
  font-weight: 800;
  color: var(--text);
  opacity: 0.04;
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
  letter-spacing: -0.05em;
  font-family: 'Plus Jakarta Sans', sans-serif;
  user-select: none;
}
.dark .giant-bg-text {
  opacity: 0.05;
}
@media (max-width: 768px) {
  .giant-bg-text {
    font-size: 28vw;
  }
}
"""

if ".giant-bg-text" not in css:
    css += bg_text_css

with open("src/App.css", "w") as f:
    f.write(css)

print("Updated App.css with giant text")
