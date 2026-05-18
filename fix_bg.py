import re

with open("src/App.css", "r") as f:
    css = f.read()

# Remove solid backgrounds
css = re.sub(r'#experience\{background:var\(--white\)\}', '', css)
css = re.sub(r'\.dark #experience\{background:var\(--surface\)\}', '', css)
css = re.sub(r'#contact\{background:var\(--white\)\}', '', css)
css = re.sub(r'\.dark #contact\{background:var\(--surface\)\}', '', css)

with open("src/App.css", "w") as f:
    f.write(css)

print("Fixed backgrounds")
