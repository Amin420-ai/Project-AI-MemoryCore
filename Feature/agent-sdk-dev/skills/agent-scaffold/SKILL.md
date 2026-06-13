---
name: agent-scaffold
description: "MUST use when user says 'create an agent', 'scaffold an agent', 'new agent',
             'build an agent', 'set up an agent', 'agent boilerplate', or when the user
             wants to start a new Claude Agent SDK project from scratch. Also triggers
             on 'initialize agent project', 'agent template', 'new sdk project'."
---

# Agent Scaffold — Claude Agent SDK Boilerplate Generator
*Instantly scaffold a new Claude Agent SDK project with working boilerplate*

## Activation

When this skill activates, output:

`"Scaffolding your Claude Agent SDK project..."`

Then execute the protocol below.

## Context Guard

| Context | Status |
|---------|--------|
| **User wants a new agent project** | ACTIVE — full scaffold protocol |
| **User says "create/scaffold/build an agent"** | ACTIVE — full scaffold protocol |
| **User is modifying an existing agent** | DORMANT — do not scaffold |
| **General coding questions** | DORMANT — do not activate |

## Protocol

### Step 1: Gather Requirements
- [ ] Ask for the agent name if not provided (default: `my-agent`)
- [ ] Ask which language: Python or TypeScript (default: Python)
- [ ] Ask for a one-sentence description of what the agent will do
- [ ] Confirm the target model (default: `claude-sonnet-4-6`)

### Step 2: Generate Project Structure
Create the following file tree:

**Python:**
```
[agent-name]/
├── agent.py          # Main agent entrypoint
├── tools.py          # Tool definitions
├── requirements.txt  # Dependencies
└── README.md         # Usage documentation
```

**TypeScript:**
```
[agent-name]/
├── src/
│   ├── agent.ts      # Main agent entrypoint
│   └── tools.ts      # Tool definitions
├── package.json      # Dependencies
├── tsconfig.json     # TypeScript config
└── README.md         # Usage documentation
```

### Step 3: Write Boilerplate Files

**Python `agent.py`:**
```python
import anthropic

client = anthropic.Anthropic()

def run_agent(user_message: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        tools=tools,
        messages=[{"role": "user", "content": user_message}],
    )
    # Agentic loop: keep running until stop_reason is "end_turn"
    messages = [{"role": "user", "content": user_message}]
    while response.stop_reason == "tool_use":
        tool_use = next(b for b in response.content if b.type == "tool_use")
        tool_result = dispatch_tool(tool_use.name, tool_use.input)
        messages += [
            {"role": "assistant", "content": response.content},
            {"role": "user", "content": [{"type": "tool_result", "tool_use_id": tool_use.id, "content": tool_result}]},
        ]
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            tools=tools,
            messages=messages,
        )
    return response.content[0].text

if __name__ == "__main__":
    print(run_agent("Hello! What can you do?"))
```

**TypeScript `src/agent.ts`:**
```typescript
import Anthropic from "@anthropic-ai/sdk";
import { tools, dispatchTool } from "./tools";

const client = new Anthropic();

async function runAgent(userMessage: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [{ role: "user", content: userMessage }];

  let response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    tools,
    messages,
  });

  while (response.stop_reason === "tool_use") {
    const toolUse = response.content.find((b) => b.type === "tool_use") as Anthropic.ToolUseBlock;
    const result = await dispatchTool(toolUse.name, toolUse.input);
    messages.push(
      { role: "assistant", content: response.content },
      { role: "user", content: [{ type: "tool_result", tool_use_id: toolUse.id, content: result }] }
    );
    response = await client.messages.create({ model: "claude-sonnet-4-6", max_tokens: 4096, tools, messages });
  }

  const textBlock = response.content.find((b) => b.type === "text") as Anthropic.TextBlock;
  return textBlock.text;
}

runAgent("Hello! What can you do?").then(console.log);
```

### Step 4: Write Supporting Files
- [ ] Create `tools.py` / `tools.ts` with one example tool and a `dispatch_tool` router
- [ ] Create `requirements.txt` with `anthropic>=0.40.0` (Python) or `package.json` with `@anthropic-ai/sdk` (TypeScript)
- [ ] Create a brief `README.md` covering install, configure `ANTHROPIC_API_KEY`, and run commands

### Step 5: Confirm
- [ ] Display the generated file tree
- [ ] Show the install command: `pip install -r requirements.txt` or `npm install`
- [ ] Remind the user to set `ANTHROPIC_API_KEY` in their environment

## Mandatory Rules

1. **Always include the agentic loop** — the scaffold must handle `tool_use` stop reason; a single `messages.create` call is not enough
2. **Default to `claude-sonnet-4-6`** — use the latest capable model unless the user specifies otherwise
3. **Never hardcode API keys** — always read from environment variable `ANTHROPIC_API_KEY`
4. **Include a dispatch router** — `tools.py` / `tools.ts` must have a function that routes tool names to implementations so the loop can call them

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **User does not specify language** | Default to Python, mention TypeScript is available |
| **User wants streaming** | Note that streaming requires `client.messages.stream()` and offer to add it |
| **User wants multi-agent** | Flag that sub-agents should be spawned via the `Task` tool pattern and offer to scaffold that instead |
| **Directory already exists** | Warn before overwriting any files |

## Level History

- **Lv.1** — Base: Scaffold single-agent Python/TypeScript boilerplate with agentic loop, tool definitions, and dispatch router. (Origin: agent-sdk-dev plugin v1.0.0)
