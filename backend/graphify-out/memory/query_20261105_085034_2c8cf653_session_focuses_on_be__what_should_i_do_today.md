---
type: "query"
date: "2026-11-05T08:50:34.232947+00:00"
question: "Session focuses on BE; what should I do today?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["Module", "DatabaseModule", "auth.guard.ts"]
---

# Q: Session focuses on BE; what should I do today?

## Answer

Expanded from the original question using graph vocabulary: [auth, user, jwt, api, database, module]. The backend graph shows a NestJS app with MongoDB DatabaseModule, JWT and argon2 dependencies, and a skeletal auth.guard.ts; the repository roadmap identifies real authentication as an unfinished backend priority. Recommend today's BE goal be an authentication MVP vertical slice: implement User schema/module, register and login using argon2, issue JWT, make AuthGuard validate protected requests, and wire GET /auth/me with @CurrentUser; add tests for registration, duplicate email, login, and protected access. Defer email verification, password reset, social OAuth, and payments integration until this slice passes build/tests. Match the frontend's planned HttpOnly-cookie session contract before finalizing token transport.

## Outcome

- Signal: useful

## Source Nodes

- Module
- DatabaseModule
- auth.guard.ts