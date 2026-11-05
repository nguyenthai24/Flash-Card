---
type: "query"
date: "2026-11-05T09:47:26.038799+00:00"
question: "How should roles be implemented in the backend User schema and guards?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["role.decorator.ts", "auth.guard.ts", "User"]
---

# Q: How should roles be implemented in the backend User schema and guards?

## Answer

Expanded from graph vocabulary: [role, user, guard, decorator]. In the current Mongoose schema, use a small UserRole string enum (USER, ADMIN) stored directly on User with required/default USER. Do not let public register DTO accept role; assign USER server-side and grant ADMIN only through controlled seed/admin operation. The existing Roles decorator should take UserRole[] and the RolesGuard should read the array via Reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [handler, class]); no metadata means allow (authentication remains the AuthGuard's job), missing required role means Forbidden 403. Keep authentication (JWT identity/401) separate from authorization (role/403). Avoid a separate role collection until roles need dynamic permissions or administrative management. Include tests for normal user, admin, no metadata, and forbidden access.

## Outcome

- Signal: useful

## Source Nodes

- role.decorator.ts
- auth.guard.ts
- User