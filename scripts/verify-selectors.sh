#!/usr/bin/env bash
#
# Checks that every class name used by a theme actually exists somewhere in the
# Jellyfin source. Catches the most common way a theme silently does nothing:
# a class name that was guessed, misspelled, or removed by an upstream release.
#
# A match here means the name exists, not that it is used the way you assume.
# It is a spellcheck, not a substitute for reading the source.
#
# Skipped (with a warning) if .reference/ is missing. Run `npm run reference:sync`.

set -uo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
src="$repo_root/.reference/jellyfin-web-stable/src"

if [ ! -d "$src" ]; then
  echo "warning  .reference/jellyfin-web-stable not found; run 'npm run reference:sync' to enable this check."
  exit 0
fi

# Class names this repo introduces rather than borrows from Jellyfin.
own_classes='^(googleapis)$'

status=0

for file in "$repo_root"/themes/*.css; do
  [ -e "$file" ] || continue

  while read -r class; do
    [ -z "$class" ] && continue
    echo "$class" | grep -Eq "$own_classes" && continue

    if ! rg -q -w -- "$class" "$src"; then
      echo "error    $(basename "$file"): .$class does not exist in Jellyfin source"
      status=1
    fi
  done < <(rg -o '\.[a-zA-Z][a-zA-Z0-9_-]*' "$file" | sed 's/.*://; s/^\.//' | sort -u)
done

if [ "$status" -eq 0 ]; then
  echo "selectors OK"
fi

exit "$status"
