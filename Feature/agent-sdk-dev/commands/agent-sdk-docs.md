---
name: agent-sdk-docs
description: "Slash command /agent-sdk-docs — display a quick-reference card for the
             Claude Agent SDK covering models, key parameters, tool schema format,
             agentic loop pattern, and useful links."
---

# /agent-sdk-docs — Claude Agent SDK Quick Reference

## Models (June 2026)

| Model ID | Alias | Notes |
|----------|-------|-------|
| `claude-sonnet-4-6` | Sonnet 4.6 | Recommended default — fast and capable |
| `claude-opus-4-8` | Opus 4.8 | Most capable, higher cost |
| `claude-haiku-4-5-20251001` | Haiku 4.5 | Fastest, lowest cost |

## Install

```bash
# Python
pip install anthropic

# TypeScript / Node
npm install @anthropic-ai/sdk
```

Set your key:
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

## Core `messages.create` Parameters

| Parameter | Type | Notes |
|-----------|------|-------|
| `model` | str | Required. See model table above. |
| `max_tokens` | int | Required. Max tokens in the response. |
| `messages` | list | Required. Conversation history. |
| `tools` | list | Optional. Tool definitions (JSON Schema). |
| `tool_choice` | dict | Optional. `{"type": "auto"}` (default), `"any"`, or `"tool"`. |
| `system` | str | Optional. System prompt. |
| `temperature` | float | Optional. 0–1. Default 1. |
| `stream` | bool | Optional. Use `client.messages.stream()` instead. |

## Tool Definition Format

```python
tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a city.",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "City name"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
            },
            "required": ["city"],
        },
    }
]
```

## Minimal Agentic Loop (Python)

```python
import anthropic

client = anthropic.Anthropic()
messages = [{"role": "user", "content": user_input}]

while True:
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        tools=tools,
        messages=messages,
    )
    if response.stop_reason == "end_turn":
        break
    # Handle tool_use
    tool_use = next(b for b in response.content if b.type == "tool_use")
    result = dispatch_tool(tool_use.name, tool_use.input)
    messages += [
        {"role": "assistant", "content": response.content},
        {"role": "user", "content": [{"type": "tool_result", "tool_use_id": tool_use.id, "content": result}]},
    ]

print(response.content[0].text)
```

## Streaming (Python)

```python
with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

## Token Counting

```python
response = client.messages.count_tokens(
    model="claude-sonnet-4-6",
    tools=tools,
    messages=messages,
)
print(response.input_tokens)
```

## stop_reason Values

| Value | Meaning |
|-------|---------|
| `end_turn` | Model finished — extract text from `.content` |
| `tool_use` | Model wants to call a tool — handle and loop |
| `max_tokens` | Hit `max_tokens` limit — increase it or truncate history |
| `stop_sequence` | Hit a custom stop sequence |

## Useful Links

- SDK docs: https://docs.anthropic.com/en/api/
- Python SDK: https://github.com/anthropics/anthropic-sdk-python
- TypeScript SDK: https://github.com/anthropics/anthropic-sdk-typescript
- Model reference: https://docs.anthropic.com/en/docs/about-claude/models
- Tool use guide: https://docs.anthropic.com/en/docs/build-with-claude/tool-use
- Agent patterns: https://docs.anthropic.com/en/docs/build-with-claude/agents
