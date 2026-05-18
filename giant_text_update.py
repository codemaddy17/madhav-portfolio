with open("src/App.css", "r") as f:
    css = f.read()

import re

old_bg_text = r"""\.giant-bg-text \{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate\(-50%, -50%\);
  font-size: 20vw;
  font-weight: 800;
  color: var\(--text\);
  opacity: 0\.04;
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
  letter-spacing: -0\.05em;
  font-family: 'Plus Jakarta Sans', sans-serif;
  user-select: none;
\}"""

new_bg_text = """.giant-bg-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  text-align: center;
  font-size: 24vw; /* Scaled up to fit screen */
  font-weight: 800;
  color: var(--text);
  opacity: 0.04;
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
  letter-spacing: -0.02em;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  user-select: none;
}"""

css = re.sub(old_bg_text, new_bg_text, css)

old_media = r"""@media \(max-width: 768px\) \{
  \.giant-bg-text \{
    font-size: 28vw;
  \}
\}"""

new_media = """@media (max-width: 768px) {
  .giant-bg-text {
    font-size: 25vw;
  }
}"""

css = re.sub(old_media, new_media, css)

with open("src/App.css", "w") as f:
    f.write(css)

print("Updated giant text font and size")
