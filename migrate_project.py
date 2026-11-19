
from pathlib import Path
import posixpath
import re
import shutil
from collections import Counter

ROOT = Path(__file__).resolve().parent

# SAFETY: First run in preview mode.
# Change to False only after checking the preview.
DRY_RUN = False

TEXT_EXTENSIONS = {".html", ".css", ".js", ".php"}

# --------------------------------------------------
# 1. BUILD FILE MIGRATION MAP
# --------------------------------------------------

file_map = {}

# Move all HTML files to root
html_files = [
    p for p in ROOT.rglob("*.html")
    if ".git" not in p.parts
]

counts = Counter(p.name.lower() for p in html_files)

used_names = set()

for file in sorted(html_files):
    relative = file.relative_to(ROOT)
    name = file.stem.replace(" ", "-") + file.suffix

    if counts[file.name.lower()] > 1:
        name = f"{relative.parent.name}-{name}"

    candidate = name
    counter = 2

    while candidate.lower() in used_names:
        candidate = (
            f"{Path(name).stem}-{counter}{Path(name).suffix}"
        )
        counter += 1

    used_names.add(candidate.lower())
    file_map[relative.as_posix()] = candidate

# Move assets subfolders to root
asset_folders = {
    "assets/css": "css",
    "assets/js": "js",
    "assets/images": "images",
    "assets/icons": "icons",
}

for old_folder, new_folder in asset_folders.items():
    source_folder = ROOT / old_folder

    if source_folder.exists():
        for file in source_folder.rglob("*"):
            if file.is_file():
                relative = file.relative_to(ROOT).as_posix()
                suffix = file.relative_to(source_folder).as_posix()

                file_map[relative] = f"{new_folder}/{suffix}"

# --------------------------------------------------
# 2. CHECK DESTINATION COLLISIONS
# --------------------------------------------------

errors = []

for old, new in file_map.items():
    destination = ROOT / new

    if destination.exists() and destination != ROOT / old:
        errors.append(f"Destination already exists: {new}")

if errors:
    print("\nMIGRATION STOPPED!")
    for error in errors:
        print(error)
    print("\nResolve these collisions before continuing.")
    raise SystemExit(1)

# --------------------------------------------------
# 3. DISPLAY MIGRATION PLAN
# --------------------------------------------------

print("\n========== MIGRATION PLAN ==========\n")

for old, new in sorted(file_map.items()):
    print(f"{old}  -->  {new}")

print(f"\nTotal files to move: {len(file_map)}")

# --------------------------------------------------
# 4. UPDATE REFERENCES
# --------------------------------------------------

reference_pattern = re.compile(
    r"""(?P<quote>["'])(?P<url>[^"']+)(?P=quote)"""
)

def update_reference(url, old_source):
    # Skip external URLs, anchors and special URLs
    if (
        url.startswith((
            "#", "/", "//", "http://", "https://",
            "mailto:", "tel:", "data:", "javascript:"
        ))
        or "{{" in url
        or "<?" in url
        or "${" in url
    ):
        return url

    # Separate query strings and fragments
    match = re.match(r"^([^?#]+)(.*)$", url)

    if not match:
        return url

    path, ending = match.groups()

    if not path:
        return url

    old_target = posixpath.normpath(
        posixpath.join(
            posixpath.dirname(old_source),
            path.replace("\\", "/")
        )
    )

    # Only modify references to existing project files
    if old_target not in file_map and not (ROOT / old_target).is_file():
        return url

    new_target = file_map.get(old_target, old_target)

    new_source = file_map.get(old_source, old_source)

    relative_path = posixpath.relpath(
        new_target,
        posixpath.dirname(new_source) or "."
    )

    return relative_path + ending


def rewrite_content(content, source):
    return reference_pattern.sub(
        lambda match: (
            match.group("quote")
            + update_reference(match.group("url"), source)
            + match.group("quote")
        ),
        content
    )

# --------------------------------------------------
# 5. PREPARE UPDATED CONTENT
# --------------------------------------------------

updated_contents = {}

for file in ROOT.rglob("*"):
    if not file.is_file():
        continue

    if ".git" in file.parts:
        continue

    if file.suffix.lower() not in TEXT_EXTENSIONS:
        continue

    if file.name == Path(__file__).name:
        continue

    relative = file.relative_to(ROOT).as_posix()

    try:
        original = file.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        print(f"Skipped non-UTF8 file: {relative}")
        continue

    updated = rewrite_content(original, relative)

    if updated != original:
        updated_contents[relative] = updated

print(f"\nFiles with updated references: {len(updated_contents)}")

# --------------------------------------------------
# 6. PREVIEW OR EXECUTE
# --------------------------------------------------

if DRY_RUN:
    print("\nPREVIEW MODE")
    print("No files have been changed or moved.")
    print("Review the migration plan carefully.")
    print("If everything looks correct, set DRY_RUN = False.")
    raise SystemExit(0)

# Write updated references before moving files
for old, content in updated_contents.items():
    (ROOT / old).write_text(content, encoding="utf-8")

# Move files
for old, new in sorted(file_map.items()):
    source = ROOT / old
    destination = ROOT / new

    if not source.exists():
        continue

    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(source), str(destination))

# Remove empty assets folders
assets = ROOT / "assets"

if assets.exists():
    for folder in sorted(
        assets.rglob("*"),
        key=lambda p: len(p.parts),
        reverse=True
    ):
        if folder.is_dir():
            try:
                folder.rmdir()
            except OSError:
                pass

    try:
        assets.rmdir()
    except OSError:
        pass

# --------------------------------------------------
# 7. GENERATE MIGRATION REPORT
# --------------------------------------------------

report = [
    "HEARTCARE PROJECT MIGRATION REPORT",
    "===================================",
    f"Files moved: {len(file_map)}",
    f"Files with updated references: {len(updated_contents)}",
    "",
    "FILE MOVEMENTS:",
]

for old, new in sorted(file_map.items()):
    report.append(f"{old} -> {new}")

report.extend([
    "",
    "Reference updates were applied to HTML, CSS, JS and PHP files.",
    "Manual testing is still required."
])

(ROOT / "migration-report.txt").write_text(
    "\n".join(report),
    encoding="utf-8"
)

print("\n===================================")
print("MIGRATION COMPLETED!")
print(f"Files moved: {len(file_map)}")
print(f"References updated: {len(updated_contents)}")
print("Report: migration-report.txt")
print("===================================")
