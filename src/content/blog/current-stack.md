---
title: "Current Stack"
date: "2026-02-18"
description: "What I'm using right now to browse, think, and build."
tags: ["dev", "workflow"]
---

My browsing setup has settled into a rotation of three. [Arc](https://arc.net) is home base — I use the tab management mostly for organized bookmarks, pins, and profiles, separating school from personal browsing from dev stuff from recruiting stuff. ChatGPT Atlas has replaced regular ChatGPT for me entirely. Being able to chat with browser context is the biggest thing — it's faster than opening five tabs and skimming for what I need. And when I need to lock in on a single task without distractions — leetcoding, focused reading, whatever — I switch to [Helium](https://helium.computer). I've thought about trying out [Zen](https://zen-browser.app) too, but haven't found the time to port over my profiles and bookmarks from Arc.

For AI chat, it depends on what I need. ChatGPT has so much memory on me at this point that it handles quick general questions really well — it just knows my context. For longer discussions — brainstorming project ideas, talking through architecture — I'll use Claude with Sonnet or Opus. I keep memory off on Claude and I find it more pleasant to talk to. The desktop app has this menu bar overlay that makes it easy to pull up mid-workflow without context switching, which I've been using more than I expected.

Dev tools are where it gets chaotic. Cursor is my primary IDE, and Composer 1.5 handles quick questions and small changes surprisingly well — I think the Composer models are genuinely underrated, they're just so fast. For anything bigger I'll reach for Codex CLI. I came back to it after a brief stint with the new Codex desktop app. Sometimes it's a single session, sometimes I'll run parallel agents — typically an orchestrator agent handling planning, code review, and git, with worker agents executing the actual tasks. I've also been playing around with Opus 4.6 in Claude Code on certain projects, though I still overall prefer the Codex models — they're better for most tasks.

One thing that's made a huge difference is having a detailed AGENTS.md in every project. I use it to set reminders for things like writing tests, git practices, updating docs, suggesting refactors when necessary, code review expectations, typing. It keeps the agents consistent across sessions without me having to repeat myself. That, combined with extensive project documentation in general, is probably the highest-leverage thing I've done for my workflow. The better your docs are, the better your agents are. I've been thinking about working up a global AGENTS.md and a soul.md — inspired by [steipete](https://x.com/steipete) — something that carries my preferences and principles across every project, not just the per-repo stuff.

[Ghostty](https://ghostty.org) is my terminal and it's usually split-screened into oblivion. One pane for git — diffs, logs, the usual. Another at project root for builds, dev servers, API checks. Then two or three panes running Codex sessions — the orchestrator in one, workers in the others. Sometimes four splits total.

![Ghostty terminal splits](/blog/ghostty-splits.png)

My config is minimal:

```
macos-titlebar-style = transparent
window-theme = system
auto-update-channel = tip
theme = Vercel
font-family = JetBrains-Mono
font-size = 12.5
macos-icon = official
```

For ML work I've been enjoying GCP and Vertex AI a lot. When I'm doing a training run, I'll have a dedicated terminal window tracking epochs and loss.
