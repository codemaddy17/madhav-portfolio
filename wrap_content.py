with open("src/App.jsx", "r") as f:
    jsx = f.read()

# 1. Replace the start: after chooser
chooser_end = "      </div>\n\n      <section id=\"about\">"
new_chooser_end = "      </div>\n\n      <main className=\"page-gradient\">\n      <section id=\"about\">"
jsx = jsx.replace(chooser_end, new_chooser_end)

# 2. Replace the end: before the final </div> of the app
footer_end = "      </div>\n    </div>\n  )\n}"
new_footer_end = "      </div>\n      </main>\n    </div>\n  )\n}"
jsx = jsx.replace(footer_end, new_footer_end)

# 3. Remove inline backgrounds from photography
jsx = jsx.replace("style={{background:'var(--off)',paddingTop:'4rem'}}", "style={{paddingTop:'4rem'}}")

with open("src/App.jsx", "w") as f:
    f.write(jsx)

import re
with open("src/App.css", "r") as f:
    css = f.read()

# Remove background: var(--off) from #skills
css = re.sub(r'#skills\{background:var\(--off\);padding-bottom:0\}', r'#skills{padding-bottom:0}', css)
css = re.sub(r'\.dark #skills\{background:var\(--off\)\}', r'', css)

# Remove background: var(--off) from #projects
css = re.sub(r'#projects\{background:var\(--off\)\}', r'', css)

# Add page-gradient class
gradient_css = """
/* ── PAGE GRADIENT ── */
.page-gradient {
  background: linear-gradient(180deg, var(--g800) 0%, var(--g600) 40%, var(--g400) 80%, var(--off) 100%);
}
.dark .page-gradient {
  background: linear-gradient(180deg, var(--g900) 0%, var(--g800) 40%, var(--g600) 80%, var(--off) 100%);
}
"""
if ".page-gradient" not in css:
    css += gradient_css

with open("src/App.css", "w") as f:
    f.write(css)

print("Wrapped in page-gradient and updated CSS")
