# Guild.ai — Autonomous Control Plane for AI Agents

> **The vendor-neutral control plane for AI agents** — manage, govern, observe, and protect every autonomous agent in enterprise production.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Pre-Dispatch Safety](https://img.shields.io/badge/Pre--Dispatch%20Interception-Sub--millisecond-emerald)](https://github.com/Achan-Sai-pranay/startup-1)
[![Architecture](https://img.shields.io/badge/SOC2-Type%20II%20Ready-violet)](https://github.com/Achan-Sai-pranay/startup-1)

---

## ⚡ The Vision

As autonomous agents transition from single-player toy scripts to production software that touches production databases, payment gateways, and cloud infrastructure, engineering teams face "Day 2" operational nightmares:
* **Agent sprawl and rogue tool calls** (e.g. hallucinating `DROP TABLE` or exfiltrating PII).
* **Uncapped runaway token loops** racking up thousands of dollars in minutes.
* **Lack of state recovery**: When a multi-step agent corrupts external state, engineers are left manually debugging broken databases.

**Guild.ai** serves as the infrastructure control plane sitting between foundational LLMs and enterprise systems.

---

## 🚀 The 2 Groundbreaking Unique Differentiators

While standard platforms only log tool executions or check static regex after actions occur, this platform introduces two foundational architectural innovations:

### 1. Autonomous Time-Travel State Repair & Micro-Rollbacks
* **The Problem:** When an autonomous agent completes 5 actions and hallucinates on Step 6, existing platforms leave databases and APIs in a corrupted partial state.
* **Our Solution:** The runtime maintains a deterministic, two-phase compensating mutation ledger. Every tool execution creates an inverse transaction recipe. With one click or automatically triggered by policy violation, the system executes atomic compensatory rollbacks, rewinding external state safely to Step 0 with zero data loss.

### 2. Cross-Agent Adversarial Consensus Mesh (Quorum Dispatch)
* **The Problem:** Single-agent policy checkers rely on brittle system prompts or simple regex that are easily bypassed by prompt injection and jailbreaks.
* **Our Solution:** Critical enterprise tool invocations (DDL changes, money movement, IAM alterations) require a zero-latency parallel quorum. An independent shadow evaluator model (running on a distinct model family) evaluates safety and intent alignment before cryptographic JWT execution tokens are signed.

---

## 🏛️ The 4 Foundational Pillars

1. **Build**: Developer-first surfaces including TypeScript SDK, CLI (`guild init`, `guild test --adversarial`, `guild deploy`), and Model Context Protocol (MCP) support.
2. **Deploy**: Managed event-driven runtime with zero cold-starts, multi-model routing (OpenAI, Claude, Gemini, DeepSeek, Ollama), and automatic canaries.
3. **Govern**: Pre-dispatch interception engine enforcing sub-millisecond safety, token/dollar rate limits, and least-privilege credential vaults.
4. **Share**: Enterprise Agent Hub with 40+ production-ready blueprints (Sentry Auto-Triager, Postgres DBA, SOC2 Security Reviewer) and team RBAC.

---

## 💻 Getting Started (Mock UI)

### Prerequisites
* Node.js >= 18.0.0
* npm >= 9.0.0

### Run Locally
```bash
# 1. Install dependencies (already installed in workspace)
npm install

# 2. Start the local Vite development server
npm run dev

# 3. Build production bundle
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to explore the live interactive showcase and Fleet Console!

---

## 🔗 Repository
Linked to [https://github.com/Achan-Sai-pranay/startup-1.git](https://github.com/Achan-Sai-pranay/startup-1.git)

