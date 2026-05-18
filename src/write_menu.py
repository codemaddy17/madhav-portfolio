# Write InfiniteMenu.jsx
content = open("/dev/stdin","r").read()
with open("src/InfiniteMenu.jsx","w") as f:
    f.write(content)
print("Done")
