# 🤖 Agent SDK Dev Plugin
*Claude Agent SDK development skills for your AI companion*

**Author:** Ashwin Bhat (ashwin@anthropic.com)  
**Version:** 1.0.0

## What This Plugin Does

Adds Claude Agent SDK development capabilities to your AI companion — scaffold new agent projects, debug SDK errors, and access an instant quick-reference card, all through auto-triggered skills and slash commands.

## Plugin Contents

```
agent-sdk-dev/
├── .claude-plugin/
│   └── plugin.json              # Plugin identity
├── skills/
│   ├── agent-scaffold/
│   │   └── SKILL.md             # Scaffold new Agent SDK projects
│   ├── sdk-debug/
│   │   └── SKILL.md             # Diagnose and fix SDK errors
│   └── temperature-log/
│       └── SKILL.md             # Food & Beverage HACCP temperature log
├── commands/
│   └── agent-sdk-docs.md        # /agent-sdk-docs quick reference
└── README.md
```

## Skills

### `agent-scaffold` — Project Boilerplate Generator
Auto-triggers when you say things like:
- "create an agent"
- "scaffold an agent"
- "new sdk project"
- "build an agent"

Generates a complete working boilerplate in **Python** or **TypeScript** including:
- Main agent file with a correct agentic loop
- Tool definitions file with dispatch router
- Dependencies file (`requirements.txt` / `package.json`)
- README with install and run instructions

### `sdk-debug` — SDK Error Diagnostics
Auto-triggers when you share an error or describe a problem with the Anthropic SDK:
- Auth errors (`401`, missing API key)
- Rate limits and overloaded errors
- Context window exceeded
- Tool schema validation failures
- Agentic loop stuck / never stops
- Streaming issues
- Network / timeout errors

Classifies the error, asks for context if needed, and provides a targeted code fix.

### `temperature-log` — Food & Beverage HACCP Log Builder
Auto-triggers when you say things like:
- "temperature log"
- "create a temperature log"
- "HACCP log"
- "food safety log"
- "cooling log" / "cold storage log"

Produces a fully structured temperature log deliverable using the HACCP framework, including:
- Executive summary and context section
- Critical Control Points (CCPs) with danger zone references (40°F–140°F)
- Actionable recommendations with specific numbers and timelines
- Implementation table with owner and priority columns
- Success metrics benchmarked against industry targets (Food Cost %, Labor Cost %, Prime Cost %)
- Risk/mitigation matrix
- After-completion memory integration (`memory.md`, `knowledge-nominations.md`, `Task Board.md`)

## Commands

### `/agent-sdk-docs` — Quick Reference Card
Displays a formatted quick-reference covering:
- Current model IDs and aliases
- Install commands
- All `messages.create` parameters
- Tool definition JSON Schema format
- Minimal agentic loop (Python)
- Streaming snippet
- Token counting
- `stop_reason` values table
- Links to official SDK docs

## Installation

```bash
# In your Claude Code session, run:
"Load agent-sdk-dev plugin"
```

Claude will:
1. Copy the plugin folder into your project
2. Register all skills and commands automatically
3. Confirm the plugin is active

After installation, the skills and `/agent-sdk-docs` command are live with no further configuration.

## Requirements

- Claude Code (Anthropic CLI)
- `ANTHROPIC_API_KEY` set in your environment

---

*agent-sdk-dev plugin — part of the AI MemoryCore ecosystem*
