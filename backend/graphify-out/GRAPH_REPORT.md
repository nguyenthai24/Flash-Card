# Graph Report - backend  (2026-10-30)

## Corpus Check
- Corpus is ~2,820 words - fits in a single context window. You may not need a graph.

## Summary
- 346 nodes · 517 edges · 18 communities (17 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Tooling and Dependencies
- NestJS Application Core
- Payment Processing
- Health Monitoring
- Runtime Dependencies
- Configuration and Database
- TypeScript Compiler Setup
- API Responses and Errors
- NestJS Project Documentation
- Application Error Handling
- Package Scripts
- Jest Test Configuration
- Nest CLI Configuration
- Test TypeScript Settings
- Test Commands
- Runtime Commands
- Build Compiler Settings
- Project Setup Instructions

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 29 edges
2. `compilerOptions` - 23 edges
3. `NestJS framework` - 16 edges
4. `scripts` - 13 edges
5. `ErrorCode` - 13 edges
6. `RedisService` - 11 edges
7. `AppService` - 10 edges
8. `jest` - 8 edges
9. `AllExceptionFilter` - 8 edges
10. `PaymentService` - 8 edges

## Surprising Connections (you probably didn't know these)
- `PaymentService` --inherits--> `AppService`  [EXTRACTED]
  src/payment.service.ts → src/app.service.ts
- `bootstrap()` --calls--> `AllExceptionFilter`  [EXTRACTED]
  src/main.ts → src/common/filters/all-exception.filter.ts
- `bootstrap()` --calls--> `ResponseInterceptor`  [EXTRACTED]
  src/main.ts → src/common/interceptors/response.interceptor.ts
- `bootstrap()` --calls--> `setupSwagger()`  [EXTRACTED]
  src/main.ts → src/common/swagger/swagger.ts
- `PaypalPaymentService` --implements--> `PaymentService`  [EXTRACTED]
  src/modules/payment/paypal-payment.service.ts → src/modules/payment/payment.service.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **NestJS runtime modes** — backend_readme_development_start_command, backend_readme_watch_mode_command, backend_readme_production_start_command [EXTRACTED 1.00]

## Communities (18 total, 1 thin omitted)

### Community 0 - "Tooling and Dependencies"
Cohesion: 0.06
Nodes (51): author, description, devDependencies, eslint@^9.18.0, eslint-config-prettier@^10.0.1, @eslint/eslintrc@^3.2.0, @eslint/js@^9.18.0, eslint-plugin-prettier@^5.2.2 (+43 more)

### Community 1 - "NestJS Application Core"
Cohesion: 0.09
Nodes (12): @nestjs/common, AppController, AppRepository, AppService, CurrentUser, IS_PUBLIC_KEY, Public(), Roles() (+4 more)

### Community 2 - "Payment Processing"
Cohesion: 0.09
Nodes (10): class-validator@^0.15.1, class-validator, ProcessPaymentDto, OrderController, OrderService, PAYMENT, PaymentModule, PaymentService (+2 more)

### Community 3 - "Health Monitoring"
Cohesion: 0.09
Nodes (7): ioredis, @nestjs/terminus, HealthController, RedisHealthIndicator, REDIS_CLIENT, RedisModule, RedisService

### Community 4 - "Runtime Dependencies"
Cohesion: 0.07
Nodes (28): dependencies, argon2@^0.45.1, bullmq@^6.0.9, class-transformer@^0.5.1, helmet@^8.3.0, ioredis@^6.0.0, mongoose@^9.9.1, @nestjs/bullmq@^11.0.4 (+20 more)

### Community 5 - "Configuration and Database"
Cohesion: 0.10
Nodes (14): joi@^18.2.3, @nestjs/config@^4.0.4, @nestjs/mongoose@^11.0.4, supertest@^7.0.0, joi, @nestjs/config, @nestjs/mongoose, supertest (+6 more)

### Community 6 - "TypeScript Compiler Setup"
Cohesion: 0.08
Nodes (23): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, incremental (+15 more)

### Community 7 - "API Responses and Errors"
Cohesion: 0.14
Nodes (11): @nestjs/core@^11.0.1, @nestjs/swagger@^11.4.6, rxjs@^7.8.1, @nestjs/core, @nestjs/swagger, rxjs, AllExceptionFilter, ApiResponse (+3 more)

### Community 8 - "NestJS Project Documentation"
Cohesion: 0.11
Nodes (19): Amazon Web Services (AWS), NestJS deployment, NestJS deployment documentation, NestJS Devtools, NestJS Discord channel, NestJS enterprise support, NestJS Jobs board, Kamil Myśliwiec (+11 more)

### Community 9 - "Application Error Handling"
Cohesion: 0.14
Nodes (12): AppException, ErrorCode, BAD_REQUEST, CONFLICT, FORBIDDEN, INTERNAL_SERVER_ERROR, INVALID_CREDENTIALS, NOT_FOUND (+4 more)

### Community 10 - "Package Scripts"
Cohesion: 0.15
Nodes (13): scripts, build, format, lint, start, start:debug, start:dev, start:prod (+5 more)

### Community 11 - "Jest Test Configuration"
Cohesion: 0.22
Nodes (9): jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment, testRegex, transform (+1 more)

### Community 12 - "Nest CLI Configuration"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 13 - "Test TypeScript Settings"
Cohesion: 0.33
Nodes (5): compilerOptions, types, extends, include, ./tsconfig.json

### Community 14 - "Test Commands"
Cohesion: 0.50
Nodes (4): Coverage command (yarn run test:cov), End-to-end test command (yarn run test:e2e), NestJS test suite, Unit-test command (yarn run test)

### Community 15 - "Runtime Commands"
Cohesion: 0.50
Nodes (4): Development start command (yarn run start), Production start command (yarn run start:prod), NestJS runtime modes, Watch-mode command (yarn run start:dev)

### Community 16 - "Build Compiler Settings"
Cohesion: 0.50
Nodes (3): exclude, extends, ./tsconfig.json

## Knowledge Gaps
- **36 isolated node(s):** `VALIDATION_ERROR`, `BAD_REQUEST`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND` (+31 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 144 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `NestJS Application Core` to `Tooling and Dependencies`, `Payment Processing`, `Health Monitoring`, `Runtime Dependencies`, `Configuration and Database`, `API Responses and Errors`, `Application Error Handling`?**
  _High betweenness centrality (0.323) - this node is a cross-community bridge._
- **What connects `VALIDATION_ERROR`, `BAD_REQUEST`, `UNAUTHORIZED` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tooling and Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05587808417997097 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Package Scripts` to `Tooling and Dependencies`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `NestJS Application Core` be split into smaller, more focused modules?**
  _Cohesion score 0.08780487804878048 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `Tooling and Dependencies` to `Configuration and Database`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `Payment Processing` be split into smaller, more focused modules?**
  _Cohesion score 0.08858858858858859 - nodes in this community are weakly interconnected._