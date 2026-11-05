---
type: "query"
date: "2026-11-05T09:34:35.271932+00:00"
question: "Should user entity/schema live in the user module or a central entities folder?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["Module", "DatabaseModule"]
---

# Q: Should user entity/schema live in the user module or a central entities folder?

## Answer

Expanded from graph vocabulary: [module, database, schema, user]. Recommend keeping the User Mongoose schema local to its owning feature, e.g. src/modules/users/schemas/user.schema.ts (or entities/user.schema.ts if the project standardizes on that name), alongside users.module.ts and users.service.ts. Keep the shared infrastructure database module responsible only for the MongoDB connection. AuthModule should consume UsersService rather than placing or duplicating the user schema in a global entities directory. Centralize only genuinely shared abstractions, not all domain models.

## Outcome

- Signal: useful

## Source Nodes

- Module
- DatabaseModule