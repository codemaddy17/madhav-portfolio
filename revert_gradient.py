import re

with open("src/App.jsx", "r") as f:
    jsx = f.read()

# Remove main tags
jsx = jsx.replace('<main className="page-gradient">\n      <section id="about">', '<section id="about">')
jsx = jsx.replace('</footer>\n      </main>\n    </div>', '</footer>\n    </div>')

# Restore photography transition and background
old_photo = '<section id="photography" style={{paddingTop:\'4rem\'}}>'
new_photo = '<div style={{background:\'linear-gradient(180deg,var(--white),var(--g900))\',height:80}}></div>\n\n      <section id="photography" style={{background:\'var(--off)\',paddingTop:\'4rem\'}}>'
jsx = jsx.replace(old_photo, new_photo)

with open("src/App.jsx", "w") as f:
    f.write(jsx)


with open("src/App.css", "r") as f:
    css = f.read()

# Remove gradient classes
css = re.sub(r'/\* ── PAGE GRADIENT ── \*/\n\.page-gradient \{[\s\S]*?\}', '', css)
css = re.sub(r'/\* ── INVERT COLORS FOR DARK GRADIENT TOP ── \*/\n#about, #skills \{[\s\S]*?\}', '', css)

# Restore #about
css = re.sub(r'/\* ── ABOUT ── \*/\n\n\n', '/* ── ABOUT ── */\n#about{background:var(--white)}\n.dark #about{background:var(--surface)}\n', css)

# Restore #skills
css = re.sub(r'#skills\{padding-bottom:0\}\n\.dark #skills\{padding-bottom:0\}', '#skills{background:var(--off);padding-bottom:0}\n.dark #skills{background:var(--off);padding-bottom:0}', css)

# Restore #experience
css = re.sub(r'/\* ── TIMELINE / EXPERIENCE ── \*/\n\n\n', '/* ── TIMELINE / EXPERIENCE ── */\n#experience{background:var(--white)}\n.dark #experience{background:var(--surface)}\n', css)

# Restore #projects
css = re.sub(r'/\* ── PROJECTS ── \*/\n\n', '/* ── PROJECTS ── */\n#projects{background:var(--off)}\n', css)

# Restore #contact
css = re.sub(r'/\* ── CONTACT ── \*/\n\n\n', '/* ── CONTACT ── */\n#contact{background:var(--white)}\n.dark #contact{background:var(--surface)}\n', css)

with open("src/App.css", "w") as f:
    f.write(css)

print("Gradient changes reverted.")
