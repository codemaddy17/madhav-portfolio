import re

with open("src/App.css", "r") as f:
    css = f.read()

# Update font-family for giant-bg-text
old_font = "font-family: 'Plus Jakarta Sans', sans-serif;"
new_font = "font-family: 'Libre Baskerville', 'Baskerville', serif;"
css = css.replace(old_font, new_font)

# Add Libre Baskerville to the @import
if "Libre+Baskerville" not in css:
    import_match = re.search(r"@import url\('([^']+)'\);", css)
    if import_match:
        old_url = import_match.group(1)
        new_url = old_url.replace("display=swap", "family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap")
        css = css.replace(old_url, new_url)

with open("src/App.css", "w") as f:
    f.write(css)
