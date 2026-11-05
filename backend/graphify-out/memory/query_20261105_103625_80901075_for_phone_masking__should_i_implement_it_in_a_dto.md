---
type: "query"
date: "2026-11-05T10:36:25.876495+00:00"
question: "For phone masking, should I implement it in a DTO or as a Mongoose schema getter?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["ResponseInterceptor", "ProcessPaymentDto"]
---

# Q: For phone masking, should I implement it in a DTO or as a Mongoose schema getter?

## Answer

Expanded from backend graph vocabulary: [dto, schema, user, response]. Implement masking in an explicit output DTO/mapper (e.g. UserResponseDto.from(user)) used by the controller/service before the global response interceptor wraps it. Keep the Mongoose @Prop definition and stored phone_number raw and normalized; do not put a getter on @Prop for a presentation-only mask. Distinguish output DTO from input/validation DTO: this is specifically a response mapping concern. Ensure password and other private fields are omitted too.

## Outcome

- Signal: useful

## Source Nodes

- ResponseInterceptor
- ProcessPaymentDto