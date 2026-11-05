---
type: "query"
date: "2026-11-05T09:57:27.093734+00:00"
question: "Do I need MongooseModule.forFeatureAsync for UserSchema with injected FlashCard and Collection models?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["Module", "DatabaseModule"]
---

# Q: Do I need MongooseModule.forFeatureAsync for UserSchema with injected FlashCard and Collection models?

## Answer

Expanded from backend graph vocabulary: [user, module, schema, database]. The current UserSchema is a static class schema and does not depend on other models, so MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]) is sufficient. Use forFeatureAsync only when the schema must be constructed asynchronously or its factory needs injected dependencies such as other registered models/configuration. A Mongoose ref alone does not require injecting the referenced model into the schema factory; register that model where a service needs to inject it.

## Outcome

- Signal: useful

## Source Nodes

- Module
- DatabaseModule