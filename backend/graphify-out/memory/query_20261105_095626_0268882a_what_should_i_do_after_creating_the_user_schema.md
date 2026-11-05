---
type: "query"
date: "2026-11-05T09:56:26.052259+00:00"
question: "What should I do after creating the User schema?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["Module", "User"]
---

# Q: What should I do after creating the User schema?

## Answer

Expanded from graph vocabulary: [user, module, schema]. The repository has an empty src/modules/users/user.module.ts and a User Mongoose schema, while AppModule currently does not import a UsersModule. Next, implement the users module by registering UserSchema with MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), then add UsersService and export it. Add DTOs with class-validator for create/find inputs; never accept role from public registration, and hash passwords before storing them. Import UsersModule into AppModule. After the user persistence path works, implement AuthModule endpoints register/login using UsersService and JWT, then protect GET /auth/me and add tests/build validation.

## Outcome

- Signal: useful

## Source Nodes

- Module
- User