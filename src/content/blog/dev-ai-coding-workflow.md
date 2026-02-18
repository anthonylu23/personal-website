---
title: "Learning to Build in the Age of Agents"
date: "2026-02-18"
description: "What it means to learn and build software right now"
tags: ["dev", "ai", "workflow"]
---

A year ago I was copy-pasting error messages into Cursor and praying for a fix. Today I ship features in a handful of prompts. This isn't a guide or a hot take — it's just what the past year and a half of building with AI has looked like for me as a student, and the things I've been thinking about along the way.

## How I Got Here

My first real exposure to AI coding was GitHub Copilot. It was useful — writing boilerplate, filling in function signatures, scaffolding repetitive patterns. But it was fundamentally autocomplete on steroids. The workflow was still *me writing code*, just with a faster keyboard. If something broke, I'd manually debug. The AI was a convenience, not a collaborator.

When I started using Claude (Sonnet 4) to write features, the scope of what I could ask for grew. I could describe a feature and get back something that looked right. But the feedback loop was painful — half my prompts were variations of "pls fix not working." The model would confidently generate code that didn't compile, or fix one thing while breaking three others. I spent as much time wrangling the output as I would have spent writing it myself. It felt like having a junior dev who never remembered previous context.

Things shifted with Codex 5.1. When I built [neural-vit](https://github.com/anthonylu23/neural-vit) — an end-to-end pipeline for classifying mouse genotypes from LFP spectrograms using a Temporal 3D Vision Transformer — I had a proper agentic pair programmer for the first time. The project spans BigQuery exports, GCS pipelines, spectrogram preprocessing, a custom ViT architecture, and Vertex AI training with experiment tracking. I had a solid ML and deep learning foundation from coursework, but building this full pipeline would have been a semester-long project working alone. With Codex, I could focus on the things that actually mattered: understanding the data, experimenting with architectures, tuning hyperparameters, interpreting results. The implementation and syntax became secondary. Not unimportant — I still need to understand the code — but no longer the bottleneck. It wasn't writing the code *for* me. It was writing the code *with* me.

The latest generation — Codex 5.3, Opus 4.6 — is a different category entirely. I built [Context Grabber](https://github.com/anthonylu23/context_grabber) with Codex 5.3 in a weekend: a macOS menu bar app and CLI that captures browser tabs and desktop apps into structured markdown for LLM workflows. Swift, TypeScript, Go, browser extensions, Apple Events, accessibility APIs. I could hand it a milestone — "build the browser bridge extraction layer" or "add the Go CLI with these subcommands" — and get back working, well-structured code in a couple of prompts. Not perfect every time, but the ratio of useful output to wrangling flipped completely. The agent became the primary programmer; I became the architect and engineer.

## What Changed My Mind

My father is a senior software engineer — old school, decades of experience, the kind of developer who's lived through multiple technology revolutions. When I first showed him Cursor almost two years ago, he wasn't convinced. To him it was neat, but ultimately just a productivity bump — not something that would change how software gets built.

A few weeks ago I introduced him to Codex 5.2. He'd barely touched AI tools before — maybe used ChatGPT once or twice. He had a large refactor to do on a Rust project at work. The kind of thing that would normally take him over a week. With Codex, he finished it in about an hour.

He called me afterward. Not to say it was cool, or useful, or interesting. He said he believed software development was going to change fundamentally.

We both agreed that AI wasn't replacing software engineers yet — and that Dario is probably still overhyping the timeline. But he felt strongly that handwriting code line-by-line was going to go away soon. He now encourages me to build as much as possible with coding agents — what some call vibe coding, though I prefer the term *agentic engineering* — and that proficiency with these tools will set my generation of developers apart from his.

He also said something that stuck with me: building without agents will leave people behind. He's somewhat indifferent to this personally — his company still hasn't officially approved coding agents internally, and he's planning to retire soon anyway. But for someone with his experience, the fact that *this* is what made him call me says something.

That conversation crystallized something I'd been feeling but hadn't been able to articulate. Early on, I felt guilty about using AI to write code. It felt like cheating, like I was using a crutch that would eventually make me a worse developer. I think a lot of students and junior devs feel this way. Hearing my father — someone who built his entire career writing code by hand in Notepad++ — tell me to lean *into* agents rather than away from them offered a perspective I hadn't considered, from someone I've always looked up to.

## Who's Been Motivating Me

I didn't figure any of this out in a vacuum. A lot of what's pushed me to keep building and experimenting comes from watching other developers navigate this same moment.

[Pete Steinberger (steipete)](https://x.com/steipete) has probably been the biggest one. Watching him constantly ship projects made it click that building is how you get better at working with agents — not reading about them or theorizing. His blog post [Shipping at Inference Speed](https://steipete.me/posts/2025/shipping-at-inference-speed) put it into words better than I could. His [conversation on Lex Fridman's podcast](https://youtube.com/watch?v=YFjfBk8HI5o) also stuck with me — particularly his point about having "empathy" for agents, talking *with* them rather than *at* them, and having realistic expectations. That reframed how I think about prompting entirely.

[Theo (t3.gg)](https://x.com/t3dotgg)'s [YouTube channel](https://www.youtube.com/@t3dotgg) has been good for cutting through noise — figuring out what actually matters in the ecosystem vs. what's just hype. And [ThePrimeagen](https://x.com/ThePrimeagen)'s [content](https://www.youtube.com/@ThePrimeagen) has been a good counterweight — a reminder that understanding what's happening under the hood still matters, even when the agent can write it for you.

Beyond individual creators, the open source energy right now has been motivating in its own right. Projects like [OpenCode](https://opencode.ai/) from [Dax and Anomaly](https://x.com/thdxr), what [Mitch Hashimoto](https://x.com/mitchellh) has been doing with developer tooling, the [Bun](https://bun.com) team rethinking the JS runtime — there are a lot of people right now who aren't just using AI tools but building the infrastructure everyone else will use. It makes me want to build more.

## Building as a Student in the Middle of All This

Being a CS student during this transition has been a weird mix of excitement and anxiety. On one hand, there's the constant background noise about AI replacing developers. On the other, I've never been able to build this much, this fast, while learning this deeply — and having this much fun doing it. I'm still figuring out where I land between those two feelings.

The traditional path was: spend months learning syntax, build toy projects, slowly work up to real applications. Now I can spin up projects in days while learning new frameworks in the process. I've been able to build for the sake of playing — picking up Go, Swift, Bun, Convex, Electron — not because I memorized their APIs, but because the agents handle the syntax while I focus on architecture and concepts. The barrier to experimenting with new languages and frameworks has essentially collapsed.

The thing I keep coming back to is that using AI well has turned out to be its own skill — decomposing problems for an agent, prompting for architecture not just working code, reviewing and iterating on output, knowing when the model is wrong. A year ago I thought I was leaning on a crutch. Now it feels more like I was learning a new tool that just happens to be fundamentally different from anything I was taught to use.

I don't know exactly where all of this is going. But I'm trying to build as much as I can while the tools keep getting better, and figure it out along the way.
