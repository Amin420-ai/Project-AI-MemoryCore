---
name: temperature-log
description: "MUST use when user says 'temperature log', 'create a temperature log',
             'food temperature record', 'HACCP log', 'cold storage log', 'temp check',
             'log temperatures', 'food safety log', or when the user needs to document,
             analyse, or build a temperature tracking deliverable for a food & beverage
             operation. Also triggers on 'cooling log', 'holding temperature', 'fridge
             log', 'freezer log', 'hot-holding record'."
---

# Temperature Log — Food & Beverage Compliance Deliverable
*Structured temperature log with HACCP validation, cost benchmarks, and actionable output*

## Activation

When this skill activates, output:

`"Building your temperature log..."`

Then execute the protocol below.

## Context Guard

| Context | Status |
|---------|--------|
| **User wants a new temperature log document** | ACTIVE — full protocol |
| **User says 'HACCP', 'food safety', 'temp check'** | ACTIVE — full protocol |
| **User reviewing or updating an existing log** | ACTIVE — skip Step 1 research, start at Step 2 |
| **General food & beverage questions** | DORMANT — do not activate |
| **Non-food industry requests** | DORMANT — do not activate |

## Protocol

### Step 1: Context & Research
- [ ] Read `memory.md` for current project context and priorities
- [ ] Read `knowledge-base.md` for relevant learned rules or constraints
- [ ] Check for any existing temperature log documents in the project
- [ ] Review `Task Board.md` for related active tasks
- [ ] Identify key stakeholders and their compliance requirements
- [ ] Select the most appropriate framework from:
  - **HACCP** (Hazard Analysis Critical Control Points) — default for compliance logs
  - **Menu Engineering Matrix** — when log feeds into menu cost analysis
  - **Prime Cost Management** — when log connects to purchasing/waste tracking

### Step 2: Analysis & Framework Application
- [ ] Apply the selected framework to structure the log
- [ ] Identify Critical Control Points (CCPs) relevant to the operation
- [ ] Define success metrics against industry benchmarks:
  - Food Cost %: target **28–32%**
  - Labor Cost %: target **25–30%**
  - Prime Cost %: target **55–65%**
  - Table Turnover Rate (if applicable)
  - Revenue Per Available Seat Hour (RevPASH)
- [ ] Document assumptions, critical temperature thresholds, and monitoring frequencies
- [ ] Validate approach against HACCP best practices and local food safety regulations

### Step 3: Build the Deliverable

Produce the temperature log using the output format below:

```markdown
# Temperature Log

## Executive Summary
[2–3 sentence overview: what operation this covers, key compliance risks, and primary recommendations]

## Context & Objectives
- **Objective**: [What this log achieves — compliance, HACCP audit, waste reduction, etc.]
- **Audience**: [Kitchen manager, health inspector, operations director, etc.]
- **Timeline**: [Daily / weekly / per shift — and date range if known]

## Analysis
[Structured analysis using the selected framework — identify CCPs, temperature danger zones
(40°F–140°F / 4°C–60°C), holding times, and any observed or projected risk areas]

## Recommendations
1. [Specific, actionable recommendation with expected impact]
2. [Specific, actionable recommendation with expected impact]
3. [Specific, actionable recommendation with expected impact]

## Implementation
| Action | Owner | Timeline | Priority |
|--------|-------|----------|----------|
| [Action item] | [Who] | [When] | [High/Medium/Low] |

## Success Metrics
| Metric | Current | Target | Measurement Method |
|--------|---------|--------|-------------------|
| Food Cost % | [Baseline] | 28–32% | Weekly P&L |
| Labor Cost % | [Baseline] | 25–30% | Weekly P&L |
| Prime Cost % | [Baseline] | 55–65% | Weekly P&L |
| CCP Compliance Rate | [Baseline] | 100% | Daily log review |

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| [Risk] | [H/M/L] | [H/M/L] | [Action] |

## Next Steps
- [ ] [Immediate next action]
- [ ] [Follow-up action]
- [ ] [Review date]
```

- [ ] Ensure all recommendations are specific with numbers, timelines, and benchmarks
- [ ] Remove any filler — every section must add operational value
- [ ] Cross-reference with existing project documents for consistency

### Step 4: Quality Validation
- [ ] All required inputs (objective, context) have been addressed
- [ ] Recommendations are specific and actionable — no vague advice
- [ ] Numbers and benchmarks are realistic and sourced
- [ ] Output format matches the specification above
- [ ] No contradictions with `knowledge-base.md` rules
- [ ] Menu engineering best practice applied if applicable (stars / plowhorses / puzzles / dogs — quarterly cadence)

### Step 5: After Completion
- [ ] Update `memory.md` if this deliverable changes project context or priorities
- [ ] Add any reusable learnings to `knowledge-nominations.md`
- [ ] Add follow-up actions to `Task Board.md` if identified
- [ ] Suggest related skills if additional work is needed

## Mandatory Rules

1. **Always include CCPs** — a temperature log without Critical Control Points is not HACCP-compliant; list them explicitly
2. **Use the danger zone** — always reference 40°F–140°F (4°C–60°C) as the temperature danger zone for hot/cold holding checks
3. **Specific numbers only** — no vague recommendations; every suggestion must include a target value, timeline, or owner
4. **Benchmark every metric** — Food Cost %, Labor Cost %, and Prime Cost % must always be shown against the industry targets above
5. **Daily counts on high-cost items** — always recommend daily inventory counts for protein and other high-cost items

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **User provides no objective** | Ask: "What is the primary goal — HACCP compliance, waste reduction, health inspection prep, or operational monitoring?" |
| **No existing log data** | Build the template with placeholder baselines and note they need to be measured |
| **Log is for a specific meal period only** | Scope CCPs and holding times to that service window; note gaps for other periods |
| **User mentions a health inspection** | Elevate Priority to High on all CCP-related actions and add an inspection-readiness checklist |
| **Non-standard temperature units** | Ask for preferred units (°F / °C) and apply consistently throughout |

## Applicable Frameworks

- HACCP (Hazard Analysis Critical Control Points) — default
- Menu Engineering Matrix
- Prime Cost Management
- Service Blueprint
- Brand Architecture

## Key Metrics Reference

| Metric | Industry Target |
|--------|----------------|
| Food Cost % | 28–32% |
| Labor Cost % | 25–30% |
| Prime Cost % | 55–65% |
| Table Turnover Rate | Operation-specific |
| Revenue Per Available Seat Hour (RevPASH) | Operation-specific |
| Customer Satisfaction Score | Operation-specific |

## Level History

- **Lv.1** — Base: Full HACCP-aligned temperature log deliverable with 4-step process, quality checklist, industry benchmarks, output format template, and after-completion memory integration. (Origin: Converted from SKILL_1.md upload, agent-sdk-dev plugin v1.0.0)
