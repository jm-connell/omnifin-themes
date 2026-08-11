#!/usr/bin/env bash
#
# Creates local, read-only checkouts of the official Jellyfin web client so that
# theme authors can verify every selector they write against real source.
#
# Produces:
#   .reference/jellyfin-web          -> master (next major, currently 12.x)
#   .reference/jellyfin-web-stable   -> $STABLE_TAG (primary compatibility target)
#
# The .reference directory is gitignored. Never edit anything inside it.
#
# When a new Jellyfin stable is released, bump STABLE_TAG here, re-run this
# script, and re-verify docs/SELECTORS.md.

set -euo pipefail

STABLE_TAG="v10.11.11"

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ref_dir="$repo_root/.reference"
main_clone="$ref_dir/jellyfin-web"
stable_tree="$ref_dir/jellyfin-web-stable"

mkdir -p "$ref_dir"

if [ ! -d "$main_clone/.git" ]; then
  echo "Cloning jellyfin/jellyfin-web (master)..."
  git clone --depth 1 https://github.com/jellyfin/jellyfin-web.git "$main_clone"
else
  echo "Updating jellyfin-web (master)..."
  git -C "$main_clone" fetch --depth 1 origin master
  git -C "$main_clone" reset --hard origin/master
fi

echo "Fetching $STABLE_TAG..."
git -C "$main_clone" fetch --depth 1 origin "refs/tags/$STABLE_TAG:refs/tags/$STABLE_TAG" --force

if [ -d "$stable_tree" ]; then
  git -C "$main_clone" worktree remove --force "$stable_tree" 2>/dev/null || rm -rf "$stable_tree"
fi

git -C "$main_clone" worktree add --detach "$stable_tree" "$STABLE_TAG"

cat <<EOF

Reference checkouts ready:
  master  -> $main_clone (version $(node -p "require('$main_clone/package.json').version" 2>/dev/null || echo '?'))
  stable  -> $stable_tree ($STABLE_TAG)

Theme colors live in src/themes/dark/theme.scss
Layout selectors live in src/styles/ and src/components/
EOF
