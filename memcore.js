#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CORE = {
  identity: path.join(ROOT, 'main', 'identity-core.md'),
  relationship: path.join(ROOT, 'main', 'relationship-memory.md'),
  session: path.join(ROOT, 'main', 'current-session.md'),
  master: path.join(ROOT, 'master-memory.md'),
};

function read(file) {
  try { return fs.readFileSync(file, 'utf8'); }
  catch { return null; }
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}

function timestamp() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

const [,, cmd, ...args] = process.argv;

switch (cmd) {
  case 'load': {
    console.log('=== MEMORY RESTORE ===\n');
    for (const [label, file] of Object.entries(CORE)) {
      const content = read(file);
      if (content) {
        console.log(`--- ${label.toUpperCase()} (${path.relative(ROOT, file)}) ---`);
        console.log(content.trim());
        console.log();
      } else {
        console.log(`[MISSING] ${file}`);
      }
    }
    break;
  }

  case 'status': {
    console.log('=== MEMORYCORE STATUS ===\n');
    for (const [label, file] of Object.entries(CORE)) {
      const exists = fs.existsSync(file);
      const size = exists ? fs.statSync(file).size : 0;
      const modified = exists ? fs.statSync(file).mtime.toISOString().slice(0, 19).replace('T', ' ') : 'n/a';
      const marker = exists ? '✓' : '✗';
      console.log(`${marker} ${label.padEnd(12)} ${path.relative(ROOT, file).padEnd(30)} ${size.toString().padStart(5)} bytes  ${modified}`);
    }
    const diary = path.join(ROOT, 'daily-diary');
    const diaryFiles = fs.existsSync(diary)
      ? fs.readdirSync(diary, { recursive: true }).filter(f => f.endsWith('.md')).length
      : 0;
    console.log(`\n  diary entries: ${diaryFiles}`);
    break;
  }

  case 'save': {
    const note = args.join(' ').trim();
    if (!note) {
      console.error('Usage: memcore save "<note>"');
      process.exit(1);
    }
    const current = read(CORE.session) || '';
    const entry = `\n<!-- saved ${timestamp()} -->\n${note}\n`;
    write(CORE.session, current + entry);
    console.log(`Saved to current-session.md at ${timestamp()}`);
    break;
  }

  case 'reset': {
    const template = read(CORE.session) || '';
    const cleaned = template.replace(/\n<!-- saved [\s\S]*$/m, '');
    write(CORE.session, cleaned);
    console.log('Session memory reset to template state.');
    break;
  }

  default: {
    console.log(`memcore — AI MemoryCore CLI

Commands:
  memcore status          Show file presence, sizes, and last-modified times
  memcore load            Print all core memory files (identity, relationship, session)
  memcore save "<note>"   Append a note to current-session.md
  memcore reset           Strip saved notes from current-session.md
`);
  }
}
