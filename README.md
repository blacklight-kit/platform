# @blacklight/platform

[![CI](https://github.com/blacklight-kit/platform/actions/workflows/ci.yml/badge.svg)](https://github.com/blacklight-kit/platform/actions/workflows/ci.yml)
[![CodeQL](https://github.com/blacklight-kit/platform/actions/workflows/codeql.yml/badge.svg)](https://github.com/blacklight-kit/platform/actions/workflows/codeql.yml)

Xbox API layer for [Blacklight](https://github.com/isamarin/blacklight) — tRPC router with MSAL auth, profile, Game Pass catalog, SmartGlass, and GSSV streaming (via `@blacklight/player`).

## Install

```bash
pnpm add github:blacklight-kit/platform#v1.0.0
```

Local development next to the monorepo:

```json
"@blacklight/platform": "file:../../platform"
```

**Dependency:** `@blacklight/player` (GSSV streaming procedures).

## Usage

```ts
import { appRouter, createCallerFactory } from '@blacklight/platform';

const caller = createCallerFactory(appRouter)({});
await caller.ping(); // 'pong'
```

Cloudflare Worker entry: `src/worker.ts`.

## tRPC surface

| Area | Procedures |
|------|------------|
| Auth | `auth_msal_*`, `auth_get_streamingtokens`, `auth_get_webtoken` |
| Profile | `profile_get_current`, `profile_get_friends`, `profile_get_played_games` |
| SmartGlass | `smartglass_consoles_list`, `smartglass_console_power_on` |
| Game Pass | `gamepass_get_*`, `gamepass_resolve_*` |
| Streaming | `streaming_*` (delegates to `@blacklight/player/server`) |

## Development

Node.js 24+, pnpm 10.4+.

```bash
pnpm install
pnpm build
pnpm test
pnpm run lint
pnpm run typecheck
pnpm run ci
pnpm dev   # wrangler dev --local
```

## Versioning

Semver. Tag `v1.0.1`, bump `package.json`, update consumers:

```json
"@blacklight/platform": "github:blacklight-kit/platform#v1.0.1"
```

`dist/` is built on install via the `prepare` script.

## License

[PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/)