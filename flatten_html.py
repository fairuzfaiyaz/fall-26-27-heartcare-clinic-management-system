
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit
import posixpath
import re

ROOT = Path(__file__).resolve().parent

# Find all HTML files except this script's root directory itself
html_files = list(ROOT.rglob("*.html"))

# Build new filenames
mapping = {}
used_names = set()

for file in html_files:
    relative = file.relative_to(ROOT)
    name = file.name

    # Prefix duplicate filenames with their original folder
    if name.lower() in used_names:
        prefix = relative.parent.name
        name = f"{prefix}-{name}"

    # Ensure there are no remaining collisions
    candidate = name
    counter = 2

    while candidate.lower() in used_names:
        stem = Path(name).stem
        suffix = Path(name).suffix
        candidate = f"{stem}-{counter}{suffix}"
        counter += 1

    mapping[relative.as_posix()] = candidate
    used_names.add(candidate.lower())

# Show planned changes
print("\nFILES TO MOVE:")
for old, new in mapping.items():
    print(f"{old}  -->  {new}")

# Update local HTML references before moving files
attribute_pattern = re.compile(
    r'(?P<prefix>\b(?:href|src|action|poster|data|formaction)\s*=\s*)'
    r'(?P<quote>["\'])(?P<url>.*?)(?P=quote)',
    re.IGNORECASE
)

def update_url(url, source):
    parts = urlsplit(url)

    if parts.scheme or parts.netloc or not parts.path:
        return url

    if parts.path.startswith("/"):
        return url

    old_target = posixpath.normpath(
        posixpath.join(source.parent.as_posix(), parts.path)
    )

    # Rename HTML targets using the mapping
    if old_target in mapping:
        new_target = mapping[old_target]
    else:
        new_target = old_target

    return urlunsplit((
        parts.scheme,
        parts.netloc,
        new_target,
        parts.query,
        parts.fragment
    ))

for file in html_files:
    source = file.relative_to(ROOT)

    content = file.read_text(encoding="utf-8")

    content = attribute_pattern.sub(
        lambda match: (
            match.group("prefix")
            + match.group("quote")
            + update_url(match.group("url"), source)
            + match.group("quote")
        ),
        content
    )

    file.write_text(content, encoding="utf-8")

# Move all HTML files to root
for file in html_files:
    relative = file.relative_to(ROOT)
    destination = ROOT / mapping[relative.as_posix()]

    if file != destination:
        file.rename(destination)

print("\nHTML restructuring completed!")
print(f"Total HTML files processed: {len(html_files)}")
