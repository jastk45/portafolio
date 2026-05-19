# PRODUCT.md

> Strategic brief and design system for `jaimeastudillo.dev` (working title).
> Two parts: (1) what the site is trying to do and for whom, (2) how it should look and read while doing it.
> This is the source of truth. If a change to the site doesn't fit here, update this doc first.

---

## Part 1 — Strategy

### 1.1 What this site is

A single-purpose evidence page that makes one argument to one reader:

> Jaime Astudillo is a Forward-Deployed / Applied AI Engineer — published researcher with a production stack (.NET 8, Python, LLM APIs, Bedrock, Kafka) who can take ambiguous problems, ship them as systems, measure them, and write about the trade-offs.

It is **not** a portfolio catalogue, a personal brand site, a blog template, or a CV viewer. Those framings invite scope creep and dilute the argument.

### 1.2 Primary reader

A recruiter or hiring manager at **Anthropic (Applied AI / Forward-Deployed)** or **OpenAI (Forward-Deployed Engineer)**, with a secondary read by **Meta (Production ML / AI Infra)** and **AI-first startups Series B+** (Cursor, Perplexity, Harvey, Mistral, Cohere, Hugging Face).

They are skimming. Anthropic's own careers page literally says: *"If you've done interesting independent research, written a thoughtful blog post, or contributed to open source, put that at the top of your resume."* The site must lead with that signal in the first viewport.

We are explicitly **not** optimising for:
- FAANG generalist SWE recruiters (LeetCode-grind funnel)
- Junior fullstack roles (the headline would have to lie)
- Local Ecuadorian SaaS shops (no upside)

### 1.3 The positioning shift

The CV / LinkedIn / site currently reads as *"IT Engineer · Full-Stack · Data Scientist · Ecuador"* — three labels and a country. Three labels is zero labels. The bifurcated 2025–2026 market punishes generalism: U.S. programmer employment fell ~27% in two years post-ChatGPT, but AI/ML engineering grew ~42% YoY and Forward-Deployed Engineer postings exploded >1,000% YoY at Anthropic and OpenAI.

The new headline locks one role:

```
Forward-Deployed AI Engineer · LLM systems + Computer Vision
Published researcher (RL, Bayesian inference, medical imaging, YOLO)
Remote · EST · Ecuador
```

- **"Forward-Deployed AI Engineer"** is the role name, not a vibe.
- **"LLM systems + Computer Vision"** are the two domains where we have shipping + published evidence. Drop anything else from the first viewport.
- **"Published researcher"** is the rare differentiator — four peer-reviewed papers, two at TICEC 2024, one at Springer 2023. Anthropic says *"All our papers have engineers as authors, often as first author."* That is the bridge.
- **"Remote · EST"** is operational, not biographical. Ecuador shares EST with no DST drift; this is a hiring advantage for U.S. East Coast labs and should read as such.

### 1.4 What we have (honest inventory)

| Asset | State | Use |
|---|---|---|
| 4 peer-reviewed papers (RL, GP+HMC, leukemia CV, drone-detection) | Published, on ORCID, on the site | Lead signal. Already in `src/content/posts/`. |
| .NET 8 + React 18 + Kafka + SQL Server production work (Logiztik) | Live, current role | Anchor project for "ships at scale" |
| React + OpenAI conversational commerce (MesinaLabs / JEANS AI) | Live, freelance | Anchor project for "LLM in production" |
| Next.js + TF/sklearn + Power BI (IFG agriculture) | Live | Supporting, weaker than the other two |
| Grafana / Airflow / Nagios ops (Digevo SENDIA) | Past | Footnote, not anchor |
| NVIDIA Transformer-Based NLP, NVIDIA Diffusion certifications | Held | Inline credential, not a section |
| GitHub `Jastk45` | Exists, underused | The single biggest gap |
| Blog / writing | **Does not exist** | The single biggest opportunity |
| MCP server, open-source contribution to a frontier repo | **Does not exist** | The single biggest near-term project |

The two empty rows are the work to do. The site can already be re-narrated *today* with what exists; the new artefacts are 60–120 days out.

### 1.5 Three anchor projects (max)

Pick three. Cut the rest from the first viewport. Both reference docs converge on this: more than three projects on the landing page reads as noise, not abundance. Eugene Yan, Chip Huyen, Jay Alammar — all of them show ≤3 anchors above the fold.

Current ranking, in the order they should appear:

1. **Logiztik enterprise platform** — cross-data-center transactional replication (Azure / Miami / Tumbaco), .NET 8 + React 18 + Kafka. Demonstrates: production scale, distributed-systems judgment, current employment. This is the "I ship real systems" anchor.
2. **JEANS AI shopping assistant** — React + OpenAI + i18next + GA4, with admin dashboard and conversation analytics. Demonstrates: LLM in production with a real user-facing surface, observability, multilingual. This is the "I deploy LLMs" anchor.
3. **Leukemia detection (post-2)** — bone-marrow smear pipeline with public + clinical data from Hospital 12 de Octubre. Demonstrates: research-grade CV, healthcare domain, dataset rigor. This is the "I have a published, defensible technical track record" anchor.

The fourth visible project should be **the new one we are about to build** (see §1.7). Until it exists, IFG agriculture takes that slot as a placeholder.

### 1.6 What each anchor must show on its detail page

Both reference docs converge on the same nine-element project case-study. Today the project markdown files are 3–4 sentence blurbs. They need to become structured case studies — without inflating fake metrics. Honest "we don't have a public benchmark for X" beats invented numbers.

The required spine, in order:

1. **Problem & context** — what we were trying to improve, under what constraints
2. **My exact contribution** — design / training / serving / evaluation / safety / coordination. Critical for team projects.
3. **Architecture** — one diagram (Mermaid is fine), tech stack with reasons not just names
4. **Dataset / data quality** — source, license, biases, splits, leakage risk, limits
5. **Baseline & alternatives** — what we compared against and why we discarded options
6. **Metrics & results** — offline, online, infra, business. Honest. With baseline.
7. **Reproducibility** — how to run it, environment, scripts, seeds, weights, Docker, tests
8. **Risks & mitigations** — bias, privacy, misuse, abuse, safety. Anthropic reads for this.
9. **What I would do differently** — judgment signal. Cheap. Always include.

For papers (`src/content/posts/`), substitute (4)–(6) with: dataset card, method, ablations, comparison table, and replace (7) with "associated code repo + reproduction notes." Same nine slots, paper-flavored.

The current markdown files all need this rewrite. It is ~3–4 hours per project, ~12 hours total, and it is the single highest-ROI piece of work after the headline change.

### 1.7 The new project — what to ship in the next 60–90 days

We need **one** new artefact that is unambiguously aimed at the Anthropic / OpenAI FDE reader. The strongest candidate, given our actual stack:

> **An MCP (Model Context Protocol) server in C# / .NET 8 for Azure DevOps.**
> Lets Claude or any MCP client create pull requests, query boards, trigger pipelines, and read build logs through the protocol.

Why this and not something else:

- **Intersection of unique stack + frontier trend.** Very few public MCP servers exist in C#/.NET; almost all are TypeScript or Python. Our `.NET 8` daily-driver skill becomes a moat instead of a generalist commodity.
- **Direct signal to Anthropic.** MCP was created and open-sourced by Anthropic. A high-quality C# server is a contribution to *their* ecosystem.
- **Naturally produces a blog post.** "Building an MCP server in .NET 8: protocol decisions, auth, transport, and what surprised me" is a 2,500-word post that writes itself once the server exists.
- **Naturally produces a frontier-repo PR.** Once the server works, a documented contribution to `modelcontextprotocol/servers` (even just an example/template) is a mergeable PR — the kind both reference docs say outweighs 50 GitHub stars on private repos.

Backup options if MCP server stalls:

- Reproduce a recent Anthropic / Karpathy paper with clean code and a write-up on the trade-offs.
- A production agentic system (FastAPI + LangSmith + evals in CI + cost monitoring + tracing) for a LATAM SMB use case — uses the Bedrock + OpenAI integration experience we already have.
- Turn the leukemia paper into a public Hugging Face Space with cited latency + AUC numbers.

The MCP server is the recommended pick. The other three are valid only if it is not feasible.

### 1.8 What we are *not* building

To stay honest about the cost of scope creep:

- ❌ A blog with 20 posts. One excellent technical post per anchor project beats 20 listicles.
- ❌ A separate `/blog`, `/projects`, `/about`, `/contact` IA. The current single-page architecture is correct and matches the canonical references (brittanychiang, jerrywei, lilianweng). Detail pages exist for projects and posts only.
- ❌ Tailwind, React, or any framework integration. The hand-written CSS *is* the signal — it says "this person has taste and can write CSS without a framework." Replacing it would lose that signal and gain nothing.
- ❌ A "skills" grid of devicon logos. Already explicitly listed as anti-reference #8 in §2.6 below.
- ❌ Translation infrastructure (i18n). The owner has flagged this as eventual. Eventual is not now. Stay in English until there is a published artefact in Spanish that justifies the toggle.
- ❌ Dark mode "improvements," theme variants, accent-color experiments, animation flourishes. The visual system is done. Touch it only to fix bugs.
- ❌ A `/now` page, a `/uses` page, a "currently reading" widget, a Spotify-now-playing embed, a GitHub contribution heatmap embed. All anti-reference; all add noise to the argument.

### 1.9 KPIs — what tells us the site is working

The site is a top-of-funnel instrument. The interesting metrics are downstream:

| Signal | Reading |
|---|---|
| Recruiter cold-outreach quality (specific role + named project from the site) | The site argument landed. |
| Recruiter cold-outreach volume (generic "AI Engineer" boilerplate) | Headline still too vague. |
| Time on page > 90s + scroll depth past `#research` | Lede + papers are doing their job. |
| GitHub `Jastk45` profile visits referred from the site | Pinned-repo strategy is working. |
| Inbound DMs that reference a specific paper or project | The detail pages are working. |
| Conversion to first-round interview after referral | The whole funnel is working. |

We do not need analytics to measure most of these — they show up as recruiter emails. If a Plausible or similar lightweight analytics gets added later, it must not require a cookie banner. If it requires a cookie banner, do not add it.

### 1.10 90-day roadmap

In order. Stop and ship after each block before starting the next.

**Block 1 — Reposition (this week, ~6h)**
- Rewrite the hero lede in `src/pages/index.astro` around the new headline (§1.3)
- Update LinkedIn headline and `<meta description>` in `Layout.astro` to match
- Move "Research" section above "Selected work" in the index (papers are the lead signal, per Anthropic's own guidance)
- Add an `arXiv` or Google Scholar link next to ORCID in the hero contact strip

**Block 2 — Rewrite anchors (next 2 weeks, ~12h)**
- Expand the four project markdowns into the nine-section case-study spine (§1.6)
- Expand the four paper markdowns the same way (with the paper-flavored substitutions)
- Add at least one architecture diagram per anchor (Mermaid in markdown, no extra build step needed)
- Add real numbers wherever defensible. Where not defensible, name the gap.

**Block 3 — GitHub clean-up (one weekend, ~6h)**
- Write `Jastk45/Jastk45` profile README (the special repo that shows on the profile)
- Pin the six most relevant repos. Archive the rest privately if they don't help the argument.
- Every pinned repo needs: README (what / why / how-to-run / decisions / lessons), LICENSE, one diagram, tests if applicable, no `fix` commits with no context

**Block 4 — Ship the MCP server (next 60 days, ~40–60h)**
- See §1.7. Build, document, blog, PR to `modelcontextprotocol/servers`.
- Add it to the index as the 4th anchor project, displacing IFG agriculture.

**Block 5 — Outreach (parallel to Block 4)**
- 2 LinkedIn DMs / week to engineers at Anthropic, OpenAI, Hugging Face, Cohere. Reference a specific paper or post they wrote. No referral asks for the first 6 weeks.
- Apply to: Anthropic Applied AI, OpenAI FDE, Hugging Face, Series-B AI startups (Cursor, Perplexity, Harvey).

**Stop signals — if any of these are true at day 90, course-correct:**
- No new artefact shipped → scope is too big; reduce.
- Outreach yielding only "boost AI thought-leadership" template responses → headline is still too vague; rewrite.
- First interview reached but failed on behavioral / safety questions → study Constitutional AI + form a written, defensible opinion on alignment before re-applying.

### 1.11 Open questions / caveats

- We have **no documented case of an Ecuadorian hired into Anthropic / OpenAI / DeepMind**. Peruvian, Brazilian, Colombian, Mexican yes; Ecuadorian, not publicly. This is either signal that the door is unusually hard, or signal that nobody from Ecuador has applied with a strong enough portfolio. Treat it as the latter, but write a "From Ecuador to [Lab]" post when (not if) the door opens — it is high-value, low-existing-supply content.
- Compensation references in the research are U.S. medians (Levels.fyi May 2026: OpenAI median TC $608K, Research Scientist median $1M). Remote-from-LATAM tends to land at 60–80% of that. Anchor expectations there; do not put a number on the site.
- The research recommends 1-page CV for junior, 2-page for senior-with-publications. Default to 2 pages PDF, generated from the same source as the site, downloadable from the hero.

---

## Part 2 — Design system

The visual system already does the right job — paper-spec aesthetic, OKLCH neutrals on hue 70, single deep-terracotta accent, no shadows or rounded corners, hand-written CSS. The notes below codify *why* so that future edits don't drift.

### 2.1 Register

**Working paper / spec sheet.** Read like a published technical document, not a marketing site. Cues:

- Monospace-feeling but not literally mono — Hanken Grotesk for body, Source Serif 4 for the hero name only.
- 1px rules separate sections. No shadows. No rounded corners (`border-radius: 0` is enforced in `global.css`).
- Tabular-numbers via `font-variant-numeric` on metadata and row numbers.
- Tufte-style margin numbers on row lists (decimal-leading-zero counters in `.row::before`).
- The asymmetric two-column desktop layout (9rem sticky label + 1fr content) mimics a marginalia annotation, not a sidebar nav.

### 2.2 Voice

| Do | Don't |
|---|---|
| "Cross-data-center transactional bidirectional replication across Azure, Miami, and Tumbaco." | "Building scalable solutions for distributed systems." |
| "First-author on TICEC 2024 paper, GP+HMC vs PINNs benchmark on Lotka-Volterra and FitzHugh-Nagumo." | "Passionate about machine learning research." |
| "Published in Springer 2023." | "Featured in a leading international publication." |
| "B2 English." | "Excellent communication skills." |
| Active voice, present tense for current work, past tense for shipped work. | Marketing modal verbs ("can help you achieve", "we deliver"). |

If a sentence could appear on any other person's portfolio, rewrite it.

### 2.3 Tokens (already in `global.css`, do not change without updating this section)

```
Paper neutrals  : OKLCH(L, 0.005–0.012 chroma, hue 70)
                  light : L 0.985 → 0.180
                  dark  : L 0.140 → 0.960
Accent          : oklch(0.50 0.16 30)  — deep terracotta, ≤10% of surface
Type — body     : Hanken Grotesk 100–900, self-hosted, latin + latin-ext subsets
Type — display  : Source Serif 4 400–700, hero name only
Scale           : step --1 (13px meta) → step h (clamp 2.5 → 5.5rem hero)
Motion          : 200ms / 320ms with cubic-bezier(0.22, 1, 0.36, 1)
                  one page-load orchestration only, no scroll-triggered reveals
```

### 2.4 Layout primitives

- `.sheet` — max-width 920px, centered. The single canvas.
- `.section` — desktop grid: `9rem 1fr`, sticky label column, 1px top border.
- `.row` — three-column grid: `2.25rem 1fr auto` (counter / body / meta).
- `.hero` — full viewport height on desktop, breaks out of `.sheet` to full-bleed.
- `.figure` — max-width 640px, 1px border, `mix-blend-mode: multiply` so matplotlib screenshots blend into the warm paper background.

Adding a new layout primitive means updating this list. If the list isn't updated, the primitive shouldn't ship.

### 2.5 Theme

Light is default (warm-paper). Dark is opt-in via the `dark` class on `<html>`, persisted in `localStorage.theme`. Two coordination points:

- `Layout.astro` runs `colorMode()` on initial load and `astro:after-swap` — without the swap listener, the theme resets on every View Transition. Do not remove.
- `ThemeIcon.astro` is `is:inline` so it handles the very first paint without an FOUC.

Any new page must inherit `Layout.astro`. Any refactor of the head must preserve the `astro:after-swap` listener.

### 2.6 Anti-references — things this site is explicitly *not*

| # | Anti-reference | Why |
|---|---|---|
| 1 | Tailwind utility soup | Defeats the "this person can write CSS" signal. |
| 2 | Glassmorphism, neumorphism, gradient meshes | Wrong register. We are a working paper, not a 2022 dribbble post. |
| 3 | Hero illustrations, blob shapes, decorative SVGs | Same. The only graphic is the featured paper figure. |
| 4 | Drop shadows, rounded corners, soft gradients | `border-radius: 0` and no `box-shadow` are enforced choices. |
| 5 | Multiple accent colors, rainbow tag pills | One accent. ≤10% surface. Anywhere else it appears, it's a bug. |
| 6 | Scroll-triggered fade-ins on every section | Cheap and dated. We have *one* orchestrated moment on page load — that's it. |
| 7 | Auto-playing background video, parallax layers, custom cursor | All loud. We are quiet. |
| 8 | A "skills" grid of devicon / simpleicons logos | Looks like an unverified self-assessment. Skills appear inline, in context, named in sentences. |
| 9 | Carousel of testimonials | We have papers and code instead. |
| 10 | Generic "About me" with childhood-passion-for-tech narrative | The about is built into the lede and the figure caption. No separate page. |
| 11 | Lighthouse/Vercel/PageSpeed badges, "as featured in" logos | Argument-by-badge. The work is the argument. |
| 12 | Newsletter signup, social-share buttons, comments widget | The reader's job is to read, then email. No funnels. |
| 13 | "Open to work" badge | Reads as desperate. If the site is up, we are open. |
| 14 | Profile photo in the hero | Headline + papers + work is the introduction. The photo can live on LinkedIn. |
| 15 | Chatbot / AI assistant on the site | Ironic but on-the-nose-wrong: this person *builds* LLM systems, doesn't deploy a wrapper around one as decoration. |

### 2.7 Canonical references (study, don't clone)

| Site | What to study |
|---|---|
| brittanychiang.com | Two-column scroll-driven IA, restraint, single-page density |
| jerrywei.net | Academic minimalism, publications upfront, no decoration |
| lilianweng.github.io | Blog-as-CV done at its best; depth of single-post engagement |
| karpathy.ai | Mix of papers, projects, talks without the site becoming a portfolio cliché |
| huyenchip.com | Author-engineer hybrid; "Start Here" as IA pattern |
| jalammar.github.io | Diagrams as primary explainer artefact; cited by Stanford / Harvard / MIT |
| nicholas.carlini.com | "Career Update" post as a genre; honest, technical, no fluff |
| simonwillison.net | Ship-something-daily cadence; writing as portfolio |
| eugene yan's site | Numbers upfront, sections by artefact type, defensible metrics |

All nine share two traits: (1) the home is a skimmable pitch in <60s, (2) every project / post is a real artefact, not a brochure. The site we are building should pass both tests.

### 2.8 SEO checklist (apply per page, not site-wide)

Inferred from Google Search Central guidance:

- `<title>` is specific: `Jaime Astudillo — Forward-Deployed AI Engineer · LLM systems + Computer Vision · Published Researcher` for the home; project-specific for detail pages.
- `<meta description>` is unique per page and summarises the actual content of *that* page. No site-wide copy paste.
- Project detail pages need their own descriptive title (e.g. `MCP Server in C#/.NET 8 — case study · Jaime Astudillo`), not `Home | Jaime`.
- Images get descriptive filenames (`leukemia-detection-bmas-output.png`, not `celu.png`), descriptive `alt`, and live near the related text.
- `public/` assets are referenced from the site root (`/blog.webp`), not `/public/blog.webp`. Astro serves `public/` at the root.

### 2.9 When to update this doc

Update this doc *before*, not after, you:

- Add a new top-level section to the index
- Add a new layout primitive to `global.css`
- Change the headline or positioning line
- Add or remove a project from the three anchors
- Add a new page, route, or content collection
- Add a third typeface, a second accent color, or scroll-triggered reveals (don't)

The doc is short on purpose. Keep it short. If a rule needs three paragraphs to defend, the rule is probably wrong.
