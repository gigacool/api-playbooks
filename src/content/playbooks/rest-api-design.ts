import type { Playbook } from "./types";

export const restApiDesignPlaybook: Playbook = {
  id: "pb-rest-api-design",
  slug: "rest-api-design",
  title: "Design a REST API",
  description:
    "A step-by-step guide for designing a REST API that consumers actually enjoy using — from resource modeling to error responses. Focuses on the decisions that matter, not framework-specific code.",
  difficulty: "intermediate",
  estimatedMinutes: 45,
  targetAudience: "Backend engineers, tech leads, API designers",
  useContext:
    "When designing a new REST API from scratch, or when refactoring an existing API that has grown inconsistent",
  overview:
    "A well-designed REST API disappears — consumers use it without fighting it. A poorly designed one generates Slack messages, support tickets, and workarounds that live forever. This playbook walks you through the seven decisions that shape a clean, consistent API: from choosing your resources and naming your endpoints, to designing error responses and pagination. Each step includes concrete do/don't guidance drawn from real-world API reviews. Follow these steps before writing code and you'll avoid the redesigns that come from coding first and designing never.",

  whenToUse: [
    "When starting a new service and defining its API surface from scratch",
    "When an existing API has grown inconsistent across endpoints and needs alignment",
    "When onboarding a new team member who will be designing endpoints",
    "When writing an API style guide for your organization",
    "During an API design review — use the checklist as a review framework",
  ],
  whenNotToUse: [
    "When you need a real-time bidirectional protocol — consider WebSockets or gRPC instead",
    "When the consumer is a single, tightly-coupled frontend — a BFF or GraphQL may be simpler",
    "As a replacement for an API specification — this guides design thinking, not contract documentation",
    "When you're building an internal RPC-style service with no external consumers",
  ],

  checklist: [
    {
      step: "Identify your resources",
      description:
        "List the nouns in your domain — these become your API resources. A resource is a thing, not an action.",
    },
    {
      step: "Design your URI structure",
      description:
        "Map resources to paths using plural nouns, max 2 levels of nesting. Actions become HTTP methods, not URL segments.",
    },
    {
      step: "Define request/response shapes",
      description:
        "Design your JSON schemas with consistent naming (camelCase or snake_case — pick one), envelope structure, and field types.",
    },
    {
      step: "Design your error responses",
      description:
        "Use RFC 9457 Problem Details format. Map business errors to proper HTTP status codes. Include field-level validation errors.",
    },
    {
      step: "Design pagination and filtering",
      description:
        "Add cursor-based pagination to all list endpoints. Return _links for navigation. Support consistent filter and sort patterns.",
    },
    {
      step: "Plan for evolution",
      description:
        "Design fields as optional by default. Plan additive changes. Avoid anything that would force versioning.",
    },
    {
      step: "Write the OpenAPI spec",
      description:
        "Document every endpoint, schema, and error case in an OpenAPI 3.x spec before writing implementation code.",
    },
  ],

  steps: [
    {
      id: "step-01",
      title: "Identify Your Resources",
      what: "List the core nouns in your domain — users, orders, products, invoices, tasks. Each noun is a candidate resource. A resource represents a thing your API manages, not an action it performs.",
      whyItMatters:
        "Getting resources wrong cascades into every endpoint. If you model 'sending an email' as a resource instead of an action on a resource, you'll end up with awkward verbs in URLs and methods that don't map to HTTP semantics.",
      commonGaps:
        "Modeling actions as resources (POST /sendEmail). Treating database tables as the resource model 1:1 — the API should reflect the business domain, not the schema. Creating too many fine-grained resources instead of composing related data.",
      guidance: [
        {
          do: "Model around business concepts: /orders, /invoices, /shipments",
          dont: "Mirror your database tables: /order_line_items, /order_status_history",
          why: "The API serves consumers, not your ORM. Database structure changes shouldn't force API changes.",
        },
        {
          do: "Use nouns for resources, HTTP methods for actions: POST /emails",
          dont: "Use verbs in URLs: POST /sendEmail, GET /getUsers",
          why: "HTTP methods already express the action — adding verbs to URLs is redundant and breaks REST semantics.",
        },
        {
          do: "Group related data into a single resource with nested objects",
          dont: "Create separate endpoints for every attribute: /users/123/name, /users/123/email",
          why: "Consumers expect to fetch a resource in one call. Over-splitting forces multiple round trips.",
        },
      ],
    },
    {
      id: "step-02",
      title: "Design Your URI Structure",
      what: "Map resources to URL paths using plural nouns. Use path parameters for identifiers. Limit nesting to 2 levels maximum. Express relationships through query parameters or sub-resource collections.",
      whyItMatters:
        "Consistent URIs make your API predictable. A consumer who sees /users and /orders should be able to guess that /products exists and behaves the same way. Inconsistent URIs force consumers to check documentation for every endpoint.",
      commonGaps:
        "Deep nesting beyond 2 levels (/companies/123/departments/456/teams/789/members). Mixing singular and plural (/user vs /orders). Inconsistent ID formats across endpoints.",
      guidance: [
        {
          do: "Use plural nouns consistently: /users, /orders, /products",
          dont: "Mix singular and plural: /user/123 but /orders",
          why: "Consistency means consumers learn the pattern once. Mixed conventions force them to memorize exceptions.",
        },
        {
          do: "Stop nesting at 2 levels: /users/123/orders",
          dont: "Nest deeper: /users/123/orders/456/items/789/variants",
          why: "Deep nesting couples your URL structure to your data model. After 2 levels, promote the nested resource: /order-items/789.",
        },
        {
          do: "Use kebab-case for multi-word resources: /order-items, /user-profiles",
          dont: "Use camelCase or snake_case in URLs: /orderItems, /order_items",
          why: "URLs are case-insensitive in practice (DNS) and kebab-case is the web convention. Consistency with browser URLs reduces confusion.",
        },
      ],
    },
    {
      id: "step-03",
      title: "Define Request/Response Shapes",
      what: "Design your JSON payloads with consistent conventions: pick a casing style (camelCase or snake_case) and use it everywhere. Wrap responses in a data envelope. Use ISO 8601 for dates. Return only the fields consumers need.",
      whyItMatters:
        "Inconsistent payloads are the #1 source of developer frustration with APIs. When userId is camelCase in one endpoint and user_id in another, every consumer has to handle both — or worse, they don't, and their integration breaks silently.",
      commonGaps:
        "Mixing casing conventions across endpoints. Returning raw database rows with internal fields exposed (password_hash, internal_status_code). Not having a consistent envelope structure (sometimes {data: ...}, sometimes bare objects, sometimes arrays at root).",
      guidance: [
        {
          do: 'Pick one casing convention and enforce it with a linter: {"userId": "u_123", "createdAt": "2026-04-13T10:00:00Z"}',
          dont: 'Mix conventions: {"userId": "u_123", "created_at": "2026-04-13", "OrderStatus": "active"}',
          why: "A linting rule catches this automatically. Inconsistency in the contract leads to inconsistency in every consumer's codebase.",
        },
        {
          do: 'Wrap responses in {data: ...} for single items and {data: [...], meta: {...}} for lists',
          dont: "Return bare objects or arrays at the root",
          why: "An envelope lets you add metadata (pagination, timestamps, request IDs) without breaking the response shape. Bare arrays can't be extended.",
        },
        {
          do: 'Use ISO 8601 with timezone for all dates: "2026-04-13T10:00:00Z"',
          dont: 'Use Unix timestamps or ambiguous formats: 1681380000, "04/13/2026", "13 Apr 2026"',
          why: "ISO 8601 is unambiguous, sortable as strings, and supported by every language's standard library.",
        },
      ],
    },
    {
      id: "step-04",
      title: "Design Your Error Responses",
      what: "Use proper HTTP status codes (don't return 200 for errors). Adopt RFC 9457 Problem Details as your error format. Include a machine-readable error type, a human-readable message, and field-level validation details for 422 responses.",
      whyItMatters:
        "Error responses are the most-consumed part of your API — consumers spend more time handling errors than processing success responses. A good error response tells the consumer what went wrong, why, and what to do about it. A bad one says 'something failed' and leaves them guessing.",
      commonGaps:
        'Returning 200 with {"error": "not found"} — this breaks every HTTP client\'s error handling. Using 500 for validation errors. Inconsistent error shapes across endpoints (sometimes {error: "..."}, sometimes {message: "..."}, sometimes {errors: [...]}).',
      guidance: [
        {
          do: 'Return proper status codes: 400 for bad input, 401 for unauthenticated, 403 for unauthorized, 404 for not found, 422 for validation failures',
          dont: 'Return 200 with {"status": "error"} or 500 for everything that isn\'t a 200',
          why: "HTTP status codes are the first thing every client checks. Misusing them breaks error handling, monitoring, retry logic, and caching — all of which rely on status code semantics.",
        },
        {
          do: 'Use RFC 9457: {"type": "https://api.example.com/errors/validation", "title": "Validation Error", "status": 422, "detail": "2 fields failed validation", "errors": [...]}',
          dont: 'Invent a custom format per endpoint: {"error": true, "msg": "bad"}',
          why: "RFC 9457 is a standard with library support in every major language. Custom formats force every consumer to write custom parsing.",
        },
        {
          do: 'Include field-level detail for validation errors: {"field": "email", "message": "must be a valid email address", "code": "invalid_format"}',
          dont: 'Return a single string: "Validation failed"',
          why: "Forms need to display errors next to the right field. A single error string means the frontend can't tell the user which field to fix.",
        },
      ],
    },
    {
      id: "step-05",
      title: "Design Pagination and Filtering",
      what: "Add cursor-based pagination to every list endpoint from day one. Return _links with next/prev/first URLs so consumers never build pagination URLs themselves. Support filtering via query parameters and sorting with a sort parameter using -prefix for descending.",
      whyItMatters:
        "Every list endpoint will eventually return too many items. If you ship without pagination, you'll need a breaking change to add it. If you use offset pagination, you'll hit performance problems at scale. Cursor pagination is stable, performant, and works from the start.",
      commonGaps:
        "Launching without pagination ('we only have 50 items'). Using offset pagination that breaks when items are inserted. Not including total or navigation metadata. Inconsistent filter parameter patterns across endpoints.",
      guidance: [
        {
          do: 'Return _links for navigation: {"_links": {"next": {"href": "/api/tasks?page[after]=abc123"}, "prev": {"href": "/api/tasks?page[before]=abc123"}}}',
          dont: "Make the frontend construct pagination URLs from cursor values",
          why: "The backend owns the pagination logic. _links let you change the cursor format, add parameters, or switch pagination strategies without touching the frontend.",
        },
        {
          do: "Use cursor pagination by default: ?page[size]=20&page[after]=opaqueCursor",
          dont: "Default to offset pagination: ?page=3&pageSize=20",
          why: "Offset pagination skips rows in the database (slow at scale) and breaks when items are inserted mid-page. Cursors are stable and O(1).",
        },
        {
          do: "Use a consistent filter pattern: ?filter[status]=active&filter[priority]=high&sort=-created_at",
          dont: "Invent different patterns per endpoint: ?status=active on /tasks but ?filterByPriority=high on /projects",
          why: "A consistent filter pattern is learnable. Consumers apply it to any list endpoint without checking docs every time.",
        },
      ],
    },
    {
      id: "step-06",
      title: "Plan for Evolution",
      what: "Design every field as optional on responses (consumers should handle missing fields). Make changes additive — new fields, new endpoints, new query parameters. Never rename, remove, or change the type of an existing field without a deprecation cycle.",
      whyItMatters:
        "Your API is a contract. Every field you return is a promise. Every change to an existing field is a potential breaking change for every consumer. Designing for evolution from day one means you'll rarely need versioning — and versioning is expensive to maintain.",
      commonGaps:
        "Renaming a field for consistency and breaking consumers who depend on the old name. Adding a required field to a request body. Changing a field from string to object. Not communicating changes before they ship.",
      guidance: [
        {
          do: "Add new fields without removing old ones. Deprecate with a Sunset header, then remove after the sunset date.",
          dont: 'Rename a field in place: "userName" → "user_name" in a single deploy',
          why: "Consumers are already parsing the old field name. Renaming it breaks their code silently — the field just comes back undefined.",
        },
        {
          do: "Apply Postel's Law: be liberal in what you accept, conservative in what you return",
          dont: "Reject requests that include unknown fields",
          why: "If consumers send fields you don't recognize, ignore them. This lets new clients talk to old servers and vice versa without coordination.",
        },
        {
          do: "Ship a changelog and use Deprecation/Sunset HTTP headers on deprecated endpoints",
          dont: "Remove endpoints or fields without notice",
          why: "Consumers can't adapt to changes they don't know about. A changelog and headers give them lead time to update their integration.",
        },
      ],
    },
    {
      id: "step-07",
      title: "Write the OpenAPI Spec First",
      what: "Before writing implementation code, write an OpenAPI 3.x specification that documents every endpoint, request/response schema, error case, and authentication requirement. Use this spec to generate server stubs, client SDKs, and documentation.",
      whyItMatters:
        "Writing the spec first forces you to think about the API from the consumer's perspective — what they'll send, what they'll receive, what can go wrong. It's much cheaper to iterate on a YAML file than to refactor implemented code and database schemas.",
      commonGaps:
        "Writing the code first and generating the spec after ('documentation as an afterthought'). Writing a spec that doesn't match the implementation. Not including error responses in the spec.",
      guidance: [
        {
          do: "Write the OpenAPI spec, review it with consumers, then implement to match the spec",
          dont: "Implement first, then reverse-engineer a spec from the code",
          why: "Spec-first catches design issues before they become code. Consumer review catches usability issues before they become support tickets.",
        },
        {
          do: "Include every error response in the spec with example payloads",
          dont: "Only document the happy path (200 responses)",
          why: "Consumers spend more time handling errors than successes. Undocumented errors become surprises that break integrations in production.",
        },
        {
          do: "Use the spec to generate server stubs, client SDKs, and mock servers",
          dont: "Treat the spec as documentation only",
          why: "A spec that generates code stays in sync with the implementation. A spec that's only read by humans drifts from reality within weeks.",
        },
      ],
    },
  ],
};
