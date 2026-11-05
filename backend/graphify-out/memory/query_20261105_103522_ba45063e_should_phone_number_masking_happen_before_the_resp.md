---
type: "query"
date: "2026-11-05T10:35:22.733681+00:00"
question: "Should phone number masking happen before the response interceptor or in the Mongoose schema?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["ResponseInterceptor", "response.interceptor.ts"]
---

# Q: Should phone number masking happen before the response interceptor or in the Mongoose schema?

## Answer

Expanded from graph vocabulary: [interceptor, schema, response, user]. The current ResponseInterceptor only wraps results and does not transform fields. Prefer masking phone_number in a user response DTO/mapper at the API boundary, before the global response wrapper, not in the database schema. Store the normalized full phone number; schema getters can affect internal document reads and JSON behavior depends on getter serialization options, while the global interceptor should not guess based on field names across all APIs. Expose a masked value for endpoints that should not reveal the full number, and omit it where not needed.

## Outcome

- Signal: useful

## Source Nodes

- ResponseInterceptor
- response.interceptor.ts