export interface Topic {
  slug: string;
  title: string;
  hook: string;
  difficulty: 1 | 2 | 3;
  readMinutes: number;
}

export interface Section {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  topics: Topic[];
}

export const sections: Section[] = [
  {
    slug: "foundations",
    number: 1,
    title: "Foundations",
    subtitle: "You're already using APIs — here's what you're not seeing",
    icon: "Blocks",
    topics: [
      {
        slug: "api-as-contract",
        title: "The API Contract Mental Model",
        hook: "Every design decision is a promise you'll have to keep",
        difficulty: 1,
        readMinutes: 4,
      },
      {
        slug: "sync-vs-async",
        title: "Sync vs Async Communication",
        hook: "The most important architectural decision you'll make",
        difficulty: 1,
        readMinutes: 5,
      },
      {
        slug: "protocol-landscape",
        title: "The Protocol Landscape",
        hook: "REST is one tool, not the only one",
        difficulty: 1,
        readMinutes: 6,
      },
      {
        slug: "data-formats",
        title: "Data Formats & Content Negotiation",
        hook: "JSON won, but the battle isn't over",
        difficulty: 1,
        readMinutes: 4,
      },
      {
        slug: "specs-as-source-of-truth",
        title: "Specs as Source of Truth",
        hook: "OpenAPI and AsyncAPI — your API's single source of truth",
        difficulty: 2,
        readMinutes: 5,
      },
    ],
  },
  {
    slug: "design",
    number: 2,
    title: "API Design",
    subtitle: "Why your API feels wrong to consume — and how to fix it",
    icon: "Compass",
    topics: [
      {
        slug: "api-first",
        title: "API-First Workflow",
        hook: "Spec → codegen → implement, not the other way around",
        difficulty: 2,
        readMinutes: 5,
      },
      {
        slug: "resource-modeling",
        title: "Resource Modeling & URI Design",
        hook: "The hardest part of API design that nobody teaches",
        difficulty: 2,
        readMinutes: 6,
      },
      {
        slug: "rest-principles",
        title: "REST Design Principles",
        hook: "Resources and state transfers, not database table wrappers",
        difficulty: 1,
        readMinutes: 6,
      },
      {
        slug: "query-design",
        title: "Query Design",
        hook: "Filtering, sorting, pagination, and sparse fieldsets done right",
        difficulty: 2,
        readMinutes: 5,
      },
      {
        slug: "error-handling",
        title: "Error Handling & Status Codes",
        hook: "Stop returning 200 for errors",
        difficulty: 1,
        readMinutes: 5,
      },
      {
        slug: "schema-evolution",
        title: "Schema Evolution > Versioning",
        hook: "The best versioning strategy is not needing one",
        difficulty: 3,
        readMinutes: 7,
      },
    ],
  },
  {
    slug: "resilience",
    number: 3,
    title: "Resilience Patterns",
    subtitle: "The patterns that separate toy APIs from production APIs",
    icon: "Shield",
    topics: [
      {
        slug: "idempotency",
        title: "Idempotency & Idempotency Keys",
        hook: "Without this, every retry is a gamble",
        difficulty: 2,
        readMinutes: 6,
      },
      {
        slug: "retry-strategies",
        title: "Retry Strategies & Exponential Backoff",
        hook: "Retrying without a strategy is just a DDoS on yourself",
        difficulty: 2,
        readMinutes: 5,
      },
      {
        slug: "circuit-breakers",
        title: "Circuit Breakers",
        hook: "When a dependency is down, stop hammering it",
        difficulty: 2,
        readMinutes: 5,
      },
      {
        slug: "rate-limiting",
        title: "Rate Limiting & Throttling",
        hook: "Protecting your API from your own users",
        difficulty: 2,
        readMinutes: 5,
      },
      {
        slug: "caching-strategies",
        title: "Caching Strategies",
        hook: "ETags, Cache-Control, and the hardest problem in CS",
        difficulty: 2,
        readMinutes: 6,
      },
      {
        slug: "timeouts-deadlines",
        title: "Timeouts & Deadline Propagation",
        hook: "No timeout means infinite wait — and a cascading failure",
        difficulty: 3,
        readMinutes: 5,
      },
    ],
  },
  {
    slug: "architecture",
    number: 4,
    title: "Architecture Patterns",
    subtitle: "Your API doesn't live alone — stop designing like it does",
    icon: "Network",
    topics: [
      {
        slug: "api-gateway",
        title: "API Gateway",
        hook: "Routing, aggregation, and cross-cutting concerns in one place",
        difficulty: 2,
        readMinutes: 6,
      },
      {
        slug: "bff-pattern",
        title: "Backend-for-Frontend (BFF)",
        hook: "Different clients deserve different APIs",
        difficulty: 2,
        readMinutes: 5,
      },
      {
        slug: "event-driven",
        title: "Event-Driven APIs",
        hook: "Webhooks, SSE, and pub/sub — when request/response isn't enough",
        difficulty: 2,
        readMinutes: 6,
      },
      {
        slug: "graphql-tradeoffs",
        title: "GraphQL: When It Shines, When It Doesn't",
        hook: "It solves real problems and introduces new ones",
        difficulty: 2,
        readMinutes: 6,
      },
      {
        slug: "saga-pattern",
        title: "Saga Pattern",
        hook: "Distributed transactions without two-phase commit",
        difficulty: 3,
        readMinutes: 6,
      },
    ],
  },
  {
    slug: "security",
    number: 5,
    title: "Security",
    subtitle: "The attack surface you're ignoring",
    icon: "Lock",
    topics: [
      {
        slug: "authn-vs-authz",
        title: "Authentication vs Identification",
        hook: "API keys are NOT authentication",
        difficulty: 1,
        readMinutes: 6,
      },
      {
        slug: "oauth-oidc",
        title: "OAuth2 & OpenID Connect",
        hook: "The flows, the tokens, and the mistakes everyone makes",
        difficulty: 2,
        readMinutes: 7,
      },
      {
        slug: "authorization-models",
        title: "Authorization Models",
        hook: "RBAC, ABAC, scopes — picking the right one",
        difficulty: 2,
        readMinutes: 5,
      },
      {
        slug: "owasp-api-top-10",
        title: "OWASP API Security Top 10",
        hook: "The vulnerabilities you're probably shipping right now",
        difficulty: 2,
        readMinutes: 6,
      },
      {
        slug: "cors",
        title: "CORS",
        hook: "Every frontend dev has fought it, few understand it",
        difficulty: 1,
        readMinutes: 5,
      },
      {
        slug: "secrets-management",
        title: "Secrets Management",
        hook: "API keys in URLs end up in logs — always",
        difficulty: 2,
        readMinutes: 4,
      },
    ],
  },
  {
    slug: "observability",
    number: 6,
    title: "Observability & Reliability",
    subtitle: "Your API is lying to you — averages hide the real story",
    icon: "Activity",
    topics: [
      {
        slug: "api-metrics",
        title: "API Metrics That Matter",
        hook: "p50/p95/p99 — because averages are lies",
        difficulty: 2,
        readMinutes: 5,
      },
      {
        slug: "distributed-tracing",
        title: "Distributed Tracing",
        hook: "Following a request across 12 services",
        difficulty: 2,
        readMinutes: 5,
      },
      {
        slug: "health-checks",
        title: "Health Checks & Readiness Probes",
        hook: "Your API says it's healthy — but is it really?",
        difficulty: 1,
        readMinutes: 4,
      },
      {
        slug: "error-budgets-slos",
        title: "Error Budgets & SLOs",
        hook: "100% uptime is the wrong target",
        difficulty: 3,
        readMinutes: 6,
      },
    ],
  },
  {
    slug: "lifecycle",
    number: 7,
    title: "Lifecycle & Developer Experience",
    subtitle: "Your API will outlive your team — plan for it",
    icon: "Repeat",
    topics: [
      {
        slug: "documentation",
        title: "Documentation That Works",
        hook: "Time-to-first-successful-call is the only metric that matters",
        difficulty: 1,
        readMinutes: 5,
      },
      {
        slug: "sdks-sandboxes",
        title: "SDKs, Sandboxes & Mock Servers",
        hook: "Meet developers where they are",
        difficulty: 2,
        readMinutes: 5,
      },
      {
        slug: "contract-testing",
        title: "Contract Testing",
        hook: "Consumer-driven contracts catch what unit tests miss",
        difficulty: 2,
        readMinutes: 6,
      },
      {
        slug: "api-linting",
        title: "API Linting & Style Guides",
        hook: "Automate consistency so you don't argue about it",
        difficulty: 2,
        readMinutes: 4,
      },
      {
        slug: "deprecation",
        title: "Backward Compatibility & Deprecation",
        hook: "Sunset headers, migration guides, and the art of letting go",
        difficulty: 2,
        readMinutes: 5,
      },
    ],
  },
  {
    slug: "ai-apis",
    number: 8,
    title: "AI x APIs",
    subtitle: "What changes when your consumer isn't human — an evolving landscape",
    icon: "Bot",
    topics: [
      {
        slug: "function-calling",
        title: "Function Calling & Tool Use",
        hook: "How LLMs consume your API — and what makes it easy or hard",
        difficulty: 2,
        readMinutes: 5,
      },
      {
        slug: "mcp",
        title: "Model Context Protocol (MCP)",
        hook: "The emerging standard for AI-tool integration",
        difficulty: 2,
        readMinutes: 5,
      },
      {
        slug: "agent-friendly-design",
        title: "Designing Agent-Friendly APIs",
        hook: "Humans need good docs — agents need predictable schemas",
        difficulty: 3,
        readMinutes: 6,
      },
    ],
  },
];

export function getSection(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug);
}

export function getTopic(sectionSlug: string, topicSlug: string) {
  const section = getSection(sectionSlug);
  if (!section) return undefined;
  const topic = section.topics.find((t) => t.slug === topicSlug);
  if (!topic) return undefined;
  return { section, topic };
}

export function getAllTopics() {
  return sections.flatMap((section) =>
    section.topics.map((topic) => ({
      section,
      topic,
    }))
  );
}

export function getAdjacentTopics(sectionSlug: string, topicSlug: string) {
  const all = getAllTopics();
  const index = all.findIndex(
    (t) => t.section.slug === sectionSlug && t.topic.slug === topicSlug
  );
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}
