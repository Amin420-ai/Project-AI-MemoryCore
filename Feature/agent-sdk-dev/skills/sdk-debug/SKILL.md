---
name: sdk-debug
description: "MUST use when user reports an error or problem with the Claude Agent SDK,
             Anthropic SDK, or anthropic Python/TypeScript package. Triggers on:
             'sdk error', 'api error', 'tool_use error', 'streaming broken', 'agent loop
             stuck', 'overloaded error', 'rate limit', 'context window', 'tool not found',
             'invalid tool input', 'stop_reason unexpected', or any traceback/error message
             from the anthropic package."
---

# SDK Debug — Claude Agent SDK Diagnostics
*Diagnose and fix common Claude Agent SDK errors fast*

## Activation

When this skill activates, output:

`"Diagnosing SDK issue..."`

Then execute the protocol below.

## Context Guard

| Context | Status |
|---------|--------|
| **User shares an error from the Anthropic SDK** | ACTIVE — full diagnostic protocol |
| **User says the agent loop is stuck or not stopping** | ACTIVE — full diagnostic protocol |
| **User asks why a tool is not being called** | ACTIVE — full diagnostic protocol |
| **General Python/TS questions unrelated to SDK** | DORMANT — do not activate |

## Protocol

### Step 1: Classify the Error
Identify the error category from the message or traceback:

| Category | Signals |
|----------|---------|
| **Auth** | `AuthenticationError`, `401`, missing `ANTHROPIC_API_KEY` |
| **Rate Limit** | `RateLimitError`, `429`, `overloaded_error` |
| **Context Window** | `ContextWindowExceededError`, `max_tokens`, token count warnings |
| **Tool Schema** | `invalid_tool_input`, `ValidationError`, tool not called when expected |
| **Agentic Loop** | Loop runs forever, `stop_reason` never becomes `end_turn` |
| **Streaming** | `stream` events missing, partial content errors |
| **Network** | `APIConnectionError`, timeout, SSL errors |

### Step 2: Ask for Context (if missing)
- [ ] Which SDK language? (Python `anthropic` / TypeScript `@anthropic-ai/sdk`)
- [ ] Which SDK version? (`pip show anthropic` / `npm list @anthropic-ai/sdk`)
- [ ] Full error traceback if not provided
- [ ] Minimal code snippet that reproduces the error

### Step 3: Diagnose by Category

**Auth errors:**
- Check `ANTHROPIC_API_KEY` is set: `echo $ANTHROPIC_API_KEY` / `process.env.ANTHROPIC_API_KEY`
- Verify the key starts with `sk-ant-`
- Check the key has not expired in the Anthropic Console

**Rate limit / overloaded:**
- Add exponential backoff — the SDK has built-in retry; confirm `max_retries` is not set to `0`
- Reduce `max_tokens` or batch fewer requests per minute
- Check if the account has hit daily spend limits in the Console

**Context window:**
- Count tokens with `client.messages.count_tokens()`
- Truncate `messages` history — keep only the last N turns
- Summarize earlier conversation turns into a system prompt prefix

**Tool schema errors:**
- Validate `input_schema` is valid JSON Schema (type, properties, required fields)
- Ensure tool `name` matches exactly between definition and any manual dispatch
- Check that `tool_choice` is not forcing a tool the model cannot satisfy

**Agentic loop stuck:**
- Confirm the loop checks `stop_reason == "tool_use"` (not `!= "end_turn"`) — both work, but mixing conditions causes bugs
- Add a max-iteration guard: `for _ in range(10): ...` to prevent runaway loops
- Print `response.stop_reason` each iteration to trace where it stalls

**Streaming issues:**
- Use `client.messages.stream()` context manager, not raw `create()` with `stream=True`
- Collect full response with `stream.get_final_message()` before accessing `.content`

**Network errors:**
- Check internet connectivity and firewall rules
- Set `timeout=httpx.Timeout(60.0)` for slow networks
- Verify no proxy is stripping TLS certificates

### Step 4: Provide a Fix
- [ ] Show the corrected code snippet with the specific change highlighted
- [ ] Explain *why* the original code caused the error
- [ ] If the fix requires an SDK upgrade: show `pip install -U anthropic` / `npm update @anthropic-ai/sdk`

### Step 5: Confirm Resolution
- [ ] Ask the user to run the fixed code and report back
- [ ] If the error persists, collect new traceback and repeat from Step 1

## Mandatory Rules

1. **Never suggest downgrading the SDK** — always recommend the latest version
2. **Never hardcode API keys in fixes** — always use environment variables
3. **Always show the minimal fix** — do not rewrite unrelated code
4. **Cite the stop_reason** — when diagnosing agentic loop issues, always print `stop_reason` in the diagnosis

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **User shares no error, just "it's not working"** | Ask for the traceback and a minimal repro before diagnosing |
| **Error is from a third-party wrapper (LangChain, LlamaIndex)** | Note that the wrapper may introduce its own bugs; suggest testing with the raw SDK first |
| **User is on an unsupported model ID** | Show the current valid model IDs and suggest `claude-sonnet-4-6` |
| **Batch API errors** | Clarify Batch API has different retry semantics and a separate results endpoint |

## Level History

- **Lv.1** — Base: Classify and diagnose the 7 most common SDK error categories with targeted fix snippets. (Origin: agent-sdk-dev plugin v1.0.0)
