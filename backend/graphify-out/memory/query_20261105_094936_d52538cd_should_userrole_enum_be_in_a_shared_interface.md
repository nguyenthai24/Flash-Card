---
type: "query"
date: "2026-11-05T09:49:36.027827+00:00"
question: "Should UserRole enum be in a shared interface?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["role.decorator.ts", "auth.guard.ts", "User"]
---

# Q: Should UserRole enum be in a shared interface?

## Answer

Expanded from graph vocabulary: [role, user, guard, decorator]. UserRole is an enum, not an interface. Since the User schema and common role decorator/guard both need the same role type, put it in a small shared module such as src/common/enums/user-role.enum.ts and import it from both. This avoids common authorization code importing from the users feature. If it is only used inside users, keep it local instead. Do not create a generic role abstraction or separate model for two fixed roles.

## Outcome

- Signal: useful

## Source Nodes

- role.decorator.ts
- auth.guard.ts
- User