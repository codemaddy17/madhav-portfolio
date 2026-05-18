import re

with open("src/App.css", "r") as f:
    css = f.read()

# Remove the solid background from #about
css = re.sub(r'#about\{background:var\(--white\)\}', '', css)
css = re.sub(r'\.dark #about\{background:var\(--surface\)\}', '', css)

# Invert text variables for the dark top-half of the gradient
invert_css = """
/* ── INVERT COLORS FOR DARK GRADIENT TOP ── */
#about, #skills {
  --text: var(--off);
  --gray: rgba(238, 238, 238, 0.85);
  --surface: rgba(255, 255, 255, 0.1);
  --g50: rgba(255, 255, 255, 0.05);
  --glass: rgba(255, 255, 255, 0.1);
}
"""
if "INVERT COLORS" not in css:
    css += invert_css

with open("src/App.css", "w") as f:
    f.write(css)

print("Removed about background and inverted text colors for top sections.")
