# Authentication integration notes

The authentication routes currently provide frontend-only forms and truthful
unavailable states. They do not authenticate users, create accounts, send email,
change passwords, or process OAuth credentials.

## Email and password

Before enabling these forms, define server-side endpoints and response contracts
for sign-in, registration, password-reset request, password reset, and email
verification/resend. The backend must enforce validation, rate limits, password
policy, session handling, and authorization. Keep tokens out of client-visible
messages and browser storage; agree on a secure session mechanism with the
backend. The current client-side minimum password length is defined once in
`src/features/auth/validation.ts` and must match the server policy.

## Social providers

Google, Facebook, and GitHub buttons are integration placeholders. No provider
is configured, and the UI intentionally does not redirect or claim success.
For each provider, register an OAuth application, configure the exact
environment-specific redirect URI, and implement authorization-code/state
validation and token exchange on a trusted server. Do not put provider client
secrets in frontend variables.

- Google: obtain the OAuth client configuration and allowed redirect URI from
  the application owner; no client ID or secret is present in this project.
- Facebook: create/configure the provider application and allowed redirect URI;
  no app ID or secret is present in this project.
- GitHub: register the OAuth application and callback URL; no client ID or
  secret is present in this project.

`/auth/callback` is only a recoverable UI state. It does not process a callback,
authorization code, token, or provider response. Connect it only after the
backend callback contract and redirect URI have been established.

## Email verification and reset links

The verification and password-reset routes accept UI state but do not validate
tokens. The backend must issue single-use, expiring tokens, send email, validate
the tokens, and return authoritative results. A query parameter or client-side
message must never be treated as proof that an address or password was changed.
