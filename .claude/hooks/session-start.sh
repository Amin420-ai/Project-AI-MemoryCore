#!/bin/bash
set -euo pipefail

# Only run in Claude Code cloud sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$(dirname "$(dirname "$0")")")}"

# Install npm dependencies if package.json exists and node_modules is missing
if [ -f package.json ] && [ ! -d node_modules ]; then
  npm install
fi
