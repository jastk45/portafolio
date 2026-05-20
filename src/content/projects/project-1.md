---
title: 'Enterprise Logistics Platform — Logiztik Alliance Group'
description: 'Full-stack development on a cross-data-center logistics platform. Transactional bidirectional replication across Azure, Miami, and Tumbaco keeps three SQL Server instances in sync so operations continue from any site if one goes down.'
platform: Web · Mobile · Enterprise
stack: C#, .NET 8, ASP.NET Core, EF Core, Kafka, React 18, Next.js 14, TypeScript, React Native, SQL Server, Docker, Serilog, Elasticsearch, Azure DevOps
---

## Problem & context

Logistics operations across three sites — **Azure cloud**, **Miami**,
and **Tumbaco** — needed to keep running even when any one site went
down. The constraint was hard: a warehouse in Tumbaco cannot stop
receiving cargo because a link to Miami flapped. That ruled out the
simple solution of having one primary site and two read replicas.

Three SQL Server instances had to stay in sync bidirectionally, with
the same business operations writable at any site, while preserving
enough consistency that two clerks at different sites do not double-
allocate the same cargo unit.

## My contribution

Full-stack feature engineer on a team of **34** across product,
platform, and operations. I owned end-to-end vertical slices:
designing the API contract in C# / .NET 8, implementing the EF Core
data layer and stored-procedure tuning on SQL Server, building the
React 18 / Next.js 14 / TypeScript front-end, and shipping
corresponding screens to the React Native warehouse companion app.
I did not architect the replication topology — that is the platform
team's domain — but I built features on top of it, which meant I had
to reason about idempotency, conflict resolution, and what happens
when a request's write is acknowledged locally before it propagates.

## Architecture (high level)

Three independent SQL Server instances behind site-local API tiers,
event-streamed through Kafka for asynchronous propagation, with
business-level conflict resolution at the application layer rather
than relying on database-level multi-master semantics alone.

```
        web (Next.js)  ───┐
                          │
        mobile (RN)   ───┤
                          ▼
                   ┌─────────────────┐
                   │  nearest API    │
                   │  (.NET 8)       │
                   └────────┬────────┘
                            │
       ┌────────────────────┼────────────────────┐
       ▼                    ▼                    ▼
  ┌─────────┐          ┌─────────┐          ┌─────────┐
  │  Azure  │          │  Miami  │          │ Tumbaco │
  │ SQL Srv │          │ SQL Srv │          │ SQL Srv │
  └────┬────┘          └────┬────┘          └────┬────┘
       │   ◄── Kafka ──►    │   ◄── Kafka ──►    │
       └───────── Kafka ◄───┴────────────────────┘

  diagnostics: Serilog → Elasticsearch (single index, all sites)
```

Diagnostics flow through Serilog into Elasticsearch so production
issues across the three sites are searchable from one place.
Delivery is via Azure DevOps pipelines and Docker images promoted
across dev / QA / prod.

## Data & workload

Logistics transactions in the order of **thousands per day** across
the three sites combined. The workload is operational rather than
analytical: small writes, high reliability requirement, modest peak
concurrency. SQL Server work concentrated on stored-procedure tuning,
view design, and LINQ query shapes that avoid pathological joins
under EF Core.

## Baseline & alternatives considered

| Option | Why not |
|---|---|
| Single primary + read replicas | Fails the "any site keeps operating" requirement. |
| Native SQL Server merge replication only | Conflict handling is too generic for business rules like cargo allocation. |
| Full event-sourced rebuild | Disproportionate to the team size and timeline. |
| Hybrid: DB replication + Kafka business events + app-level resolution | What we shipped. |

## Results

| Dimension | Outcome |
|---|---|
| Replication latency between sites | 1–3 seconds typical |
| Per-site availability under peer outage | Continues writing locally |
| Diagnostic time-to-find for cross-site issues | Single Serilog / Elasticsearch view |
| Deployment cadence | Multiple promotions per week through Azure DevOps |

Business volume and exact SLA numbers are confidential.

## Reproducibility

The platform is internal to Logiztik and not open-source. What is
portable:

- The pattern of *database replication + Kafka events + app-level
  conflict resolution* is reproducible in any stack where the business
  rules cannot be expressed as generic last-write-wins.
- The EF Core + stored-procedure split — using EF for CRUD and stored
  procedures for hot paths — is a recipe I would carry to any future
  .NET 8 project at similar scale.
- The Serilog → Elasticsearch pipeline is essentially configuration; the
  value is the discipline of structured logging at every boundary.

## Risks & trade-offs

The honest trade-offs in a multi-site multi-write system:

- **Eventual consistency is real.** A clerk in Tumbaco can see a state
  that Miami has not yet acknowledged. UX has to make that visible
  rather than hide it.
- **Conflict resolution lives in business logic.** Generic resolution
  policies (last-write-wins, vector clocks) are necessary but not
  sufficient — cargo allocation rules are not generic.
- **Operational burden scales with sites.** Three sites is not three
  times the work of one; it is closer to the square. Observability
  is not optional, it is the only way the system is debuggable.
- **Kafka is a moving part with its own failure modes.** Back-pressure,
  partition rebalances, and offset management add complexity that has
  to be owned by someone on call.

## What I would do differently

If I were starting again on the same problem:

- Push more business rules into a shared library reused by all three
  site APIs, rather than re-deriving them per site. The drift risk
  between three .NET projects is real over time.
- Standardise on a single structured event schema from day one. We
  evolved into one; we did not start with one.
- Invest in synthetic cross-site transaction probes earlier. By the
  time you need them in an incident, it is too late to build them.
- Front the React 18 and Next.js 14 codebases with a shared component
  library sooner — both apps drifted in subtle UX details that took
  effort to reconcile.
