---
title: 'Enterprise Logistics Platform — Logiztik Alliance Group'
description: 'Full-stack development of enterprise logistics systems with bidirectional replication across Azure, Miami, and Tumbaco data centers.'
platform: Web · Enterprise
stack: C#, .NET 8, ASP.NET Core, EF Core, Kafka, React 18, Next.js 14, TypeScript, React Native, SQL Server, Docker, Serilog, Elasticsearch, Azure DevOps
---

Cross-data-center transactional bidirectional replication across **Azure**, **Miami**, and **Tumbaco**. The replication layer keeps three independent SQL Server instances in sync so operations can continue from any site if one goes down.

Full-stack feature work on **C#/.NET 8** (ASP.NET Core, EF Core, Kafka) on the backend, **React 18**, **Next.js 14** and **TypeScript** on the frontend. **React Native** companion app for warehouse personnel.

**SQL Server** performance tuning — stored procedures, views, LINQ optimization. Logging through **Serilog** + **Elasticsearch** for searchable production diagnostics. Deployment across dev / QA / prod via **Azure DevOps** pipelines and **Docker** containers.
