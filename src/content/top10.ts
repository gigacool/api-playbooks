export interface Commandment {
  number: number;
  title: string;
  oneLiner: string;
  why: string;
  doThis: string;
  notThis: string;
  example?: {
    bad: string;
    good: string;
    language: string;
  };
  deepDiveLinks: Array<{
    label: string;
    href: string;
  }>;
}

export const commandments: Commandment[] = [
  {
    number: 1,
    title: "Your API Is a Contract, Not an Implementation Detail",
    oneLiner:
      "Every field, endpoint, and status code is a promise. Treat it like one.",
    why: "Once a consumer depends on a field, renaming it breaks their app. Once they parse your error format, changing it breaks their error handling. Your API is a published interface with downstream dependencies — not internal code you can refactor freely.",
    doThis: "Write the spec before the code. Review changes for backward compatibility.",
    notThis:
      'Rename fields for consistency without a migration plan. Ship and "fix later."',
    example: {
      bad: '// Renamed without warning — mobile app crashes\n{ "user_name": "alice" }',
      good: '// Old field kept, new field added\n{ "userName": "alice", "user_name": "alice" }',
      language: "json",
    },
    deepDiveLinks: [
      { label: "The API Contract Mental Model", href: "/foundations/api-as-contract" },
      { label: "Schema Evolution > Versioning", href: "/design/schema-evolution" },
    ],
  },
  {
    number: 2,
    title: "Design for Your Consumer, Not Your Database",
    oneLiner:
      "Resources are business concepts, not table names. Verbs are HTTP methods, not URL segments.",
    why: "Your API serves developers, not your ORM. When your API mirrors your database schema, every schema migration becomes an API breaking change. Model around what consumers need, not how you store it.",
    doThis: "Use plural nouns (/orders, /users). Express actions through HTTP methods.",
    notThis: "POST /sendEmail, GET /getUser, /order_line_items.",
    example: {
      bad: 'POST /api/sendEmail\nPOST /api/createUser\nGET /api/getOrderById?id=123',
      good: 'POST /api/emails\nPOST /api/users\nGET /api/orders/123',
      language: "bash",
    },
    deepDiveLinks: [
      { label: "Resource Modeling & URI Design", href: "/design/resource-modeling" },
      { label: "REST Design Principles", href: "/design/rest-principles" },
      { label: "REST API Design Playbook", href: "/playbooks/rest-api-design" },
    ],
  },
  {
    number: 3,
    title: "Use HTTP Status Codes. For Real.",
    oneLiner:
      "200 means success. Stop returning 200 with an error body.",
    why: "Every HTTP client, monitoring tool, retry logic, and cache relies on status codes. When you return 200 for errors, you break all of them. Consumers have to parse your body to know if the request succeeded — that's a bug, not a design choice.",
    doThis:
      "400 for bad input, 401 for unauthenticated, 403 for forbidden, 404 for not found, 422 for validation, 429 for rate limited, 500 for server errors. Use RFC 9457 Problem Details for error bodies.",
    notThis: '200 with {"error": "not found"}. 500 for everything that isn\'t a 200.',
    example: {
      bad: 'HTTP/1.1 200 OK\n\n{"status": "error", "message": "User not found"}',
      good: 'HTTP/1.1 404 Not Found\nContent-Type: application/problem+json\n\n{"type": "/errors/not-found", "title": "Not Found", "status": 404}',
      language: "http",
    },
    deepDiveLinks: [
      { label: "Error Handling & Status Codes", href: "/design/error-handling" },
    ],
  },
  {
    number: 4,
    title: "Be Consistent. Obsessively.",
    oneLiner:
      "Pick one naming convention, one date format, one envelope structure — and enforce it everywhere.",
    why: "Inconsistency is the #1 source of developer frustration. When userId is camelCase in one endpoint and user_id in another, every consumer has to handle both. Automate consistency with linting so you don't argue about it in code reviews.",
    doThis:
      'One casing style (camelCase or snake_case). ISO 8601 dates. {data: ...} envelope. Enforce with Spectral.',
    notThis:
      'userId here, user_id there. Unix timestamps in one endpoint, "April 13" in another.',
    example: {
      bad: '{"userId": "u_1", "created_at": 1681380000, "OrderStatus": "active"}',
      good: '{"user_id": "u_1", "created_at": "2026-04-13T10:00:00Z", "order_status": "active"}',
      language: "json",
    },
    deepDiveLinks: [
      { label: "API Linting & Style Guides", href: "/lifecycle/api-linting" },
      { label: "REST API Design Playbook", href: "/playbooks/rest-api-design" },
    ],
  },
  {
    number: 5,
    title: "Paginate Everything. From Day One.",
    oneLiner:
      "Every list endpoint will eventually return too many items. Add cursor pagination before it's too late.",
    why: "Adding pagination later is a breaking change. Offset pagination breaks when items are inserted and gets slower at scale. Cursor pagination is stable, O(1), and works from the start. Return _links so the frontend never builds pagination URLs.",
    doThis:
      "Cursor pagination by default. Return _links with next/prev. Let the backend own the pagination logic.",
    notThis:
      "No pagination ('we only have 50 items'). Offset pagination as the default.",
    example: {
      bad: '{"data": ["...all 12,000 items..."]}',
      good: '{"data": ["...20 items..."], "_links": {"next": {"href": "/api/tasks?page[after]=abc123"}}, "meta": {"has_next_page": true}}',
      language: "json",
    },
    deepDiveLinks: [
      { label: "Query Design (pagination, filtering, sorting)", href: "/design/query-design" },
    ],
  },
  {
    number: 6,
    title: "Every Write Needs an Idempotency Strategy",
    oneLiner:
      "Without idempotency, every retry is a gamble. Double charges, duplicate orders, duplicated everything.",
    why: "Networks fail. Clients retry. If your POST endpoint creates a new resource every time it's called, a single network timeout can cause a double charge. Idempotency keys let the server recognize duplicate requests and return the cached result instead of re-processing.",
    doThis:
      "Require an Idempotency-Key header on POST endpoints. Store and return cached results for duplicate keys.",
    notThis:
      "Hope that retries won't happen. Tell clients to 'just don't retry.'",
    example: {
      bad: 'POST /api/payments\n// Client retries after timeout -> two charges',
      good: 'POST /api/payments\nIdempotency-Key: pay_req_abc123\n// Server returns cached result on retry -> one charge',
      language: "http",
    },
    deepDiveLinks: [
      { label: "Idempotency & Idempotency Keys", href: "/resilience/idempotency" },
      { label: "Retry Strategies & Exponential Backoff", href: "/resilience/retry-strategies" },
    ],
  },
  {
    number: 7,
    title: "Secure the Defaults, Not Just the Happy Path",
    oneLiner:
      "API keys are identification, not authentication. Rate-limit your auth endpoints. Never put secrets in URLs.",
    why: "The OWASP API Top 10 exists because most APIs ship with the same vulnerabilities: broken object-level authorization, excessive data exposure, missing rate limiting on login endpoints. Your API key identifies the caller — it doesn't prove who they are. Secrets in URLs end up in server logs, browser history, and CDN caches.",
    doThis:
      "OAuth2 for authentication. Rate-limit login endpoints aggressively. Transmit secrets in headers, never URLs. Return only the fields consumers need.",
    notThis:
      "API keys as auth. No rate limiting on /login. Secrets in query parameters.",
    example: {
      bad: "GET /api/users/123?api_key=sk_live_REDACTED",
      good: "GET /api/users/123\nAuthorization: Bearer eyJhbG...\nX-API-Key: pk_live_app_id",
      language: "http",
    },
    deepDiveLinks: [
      { label: "Authentication vs Identification", href: "/security/authn-vs-authz" },
      { label: "OWASP API Security Top 10", href: "/security/owasp-api-top-10" },
      { label: "Secrets Management", href: "/security/secrets-management" },
      { label: "CORS", href: "/security/cors" },
    ],
  },
  {
    number: 8,
    title: "Measure What Matters: p99, Not Averages",
    oneLiner:
      "Your average latency is a lie. Your most active users live at p99.",
    why: "99 requests at 50ms + 1 request at 5000ms = average of 99ms. Looks fine. But that p99 user — who hits your API 100 times per session — has a 63% chance of experiencing the 5-second response. Averages hide your worst performance from your best customers.",
    doThis:
      "Track p50, p95, p99. Set SLOs based on percentiles. Alert on error budgets, not individual failures.",
    notThis:
      "Monitor average latency. Set uptime target to 100%. Alert on every 500.",
    deepDiveLinks: [
      { label: "API Metrics That Matter", href: "/observability/api-metrics" },
      { label: "Error Budgets & SLOs", href: "/observability/error-budgets-slos" },
      { label: "Health Checks & Readiness Probes", href: "/observability/health-checks" },
    ],
  },
  {
    number: 9,
    title: "Documentation Is Product, Not Afterthought",
    oneLiner:
      "Time-to-first-successful-call is the only metric that matters for your docs.",
    why: "Stripe didn't win because they had the best payment API. They won because they had the best documentation. If a developer can't get a 200 response in 5 minutes with your docs, they'll find an API where they can. Write the spec first (OpenAPI), include curl examples for every endpoint, show error responses — not just the happy path.",
    doThis:
      "Spec-first with OpenAPI. Curl + JSON examples for every endpoint. Document errors, not just successes. Measure time-to-first-call.",
    notThis:
      "Auto-generated docs from code comments. 'Refer to the source code.' Happy-path-only documentation.",
    deepDiveLinks: [
      { label: "Documentation That Works", href: "/lifecycle/documentation" },
      { label: "SDKs, Sandboxes & Mock Servers", href: "/lifecycle/sdks-sandboxes" },
      { label: "Specs as Source of Truth", href: "/foundations/specs-as-source-of-truth" },
      { label: "API-First Workflow", href: "/design/api-first" },
    ],
  },
  {
    number: 10,
    title: "Design for Evolution, Not for Versioning",
    oneLiner:
      "The best versioning strategy is not needing one. Design for additive change.",
    why: "Every API version you maintain is a version you support, document, test, and eventually sunset. If you design for evolution — additive fields, optional parameters, Postel's Law — you'll version once every few years instead of every release. When you must deprecate, use Sunset headers and migration guides, not surprise removals.",
    doThis:
      "Add fields, never remove them. Deprecate with Sunset headers and timelines. Apply Postel's Law: be liberal in what you accept, conservative in what you send.",
    notThis:
      "URL versioning for every change (/v1, /v2, /v3). Removing fields without notice. Breaking changes on Friday.",
    deepDiveLinks: [
      { label: "Schema Evolution > Versioning", href: "/design/schema-evolution" },
      { label: "Backward Compatibility & Deprecation", href: "/lifecycle/deprecation" },
      { label: "Contract Testing", href: "/lifecycle/contract-testing" },
    ],
  },
];
