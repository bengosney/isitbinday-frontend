# Is it bin day?

A practical task list for the house. Frontend for [isitbinday](https://github.com/bengosney/isitbinday) — tasks, books, and recipes, backed by a Django REST API.

Built with React 19, TypeScript, Vite, and Chakra UI v3. Data is cached locally in PouchDB so previously fetched pages render instantly while fresh data loads.

## Requirements

- Node 22+ (see `.nvmrc`)
- pnpm 10 (via corepack: `corepack enable`)
- A running [backend API](https://github.com/bengosney/isitbinday) (defaults to `http://localhost:8000`)

## Getting started

```sh
corepack enable
pnpm install
pnpm start
```

The app runs at http://localhost:5173. To point it at a different API:

```sh
VITE_API_URL=https://api.example.com pnpm start
```

## Scripts

| Command        | What it does                                                 |
| -------------- | ------------------------------------------------------------ |
| `pnpm start`   | Dev server with HMR                                          |
| `pnpm build`   | Type-check (`tsc --noEmit`) then production build to `dist/` |
| `pnpm preview` | Serve the production build locally                           |
| `pnpm test`    | Run tests with Vitest                                        |
| `pnpm lint`    | ESLint over `src/`                                           |
| `pnpm format`  | Prettier over `src/`                                         |

## Project structure

```
src/
  sections/   Route-level components (tasks, books, recipes, auth, static pages)
  widgets/    Reusable UI pieces (TaskCard, TaskList, Nav, forms…)
  forms/      Formik form definitions
  schemas/    Yup validation schemas
  utils/      apiFetch (auth + refresh token handling), Form helpers, design tokens
  db.ts       PouchDB local cache
  config.ts   Runtime config (API origin, build stamp)
```

Routing lives under `/iibd/*` for the authenticated app (react-router v7); auth uses JWT with automatic refresh, plus optional Google sign-in.

## Deployment

Pushes to `master` are built and deployed automatically by AWS Amplify using `amplify.yml` (pnpm install → build → serve `dist/` with an SPA rewrite rule). DNS is on Cloudflare.

The infrastructure is managed with OpenTofu/Terraform in [`infrastructure/`](infrastructure/); state and tfvars live in S3. From that directory:

```sh
make init    # fetch tfvars/imports from S3 and init
make apply   # plan + apply
make upload  # push updated tfvars back to S3
```

Required env vars for the Makefile: `TERAFORM_BUCKET`, `TERAFORM_BUCKET_REGION`, `TERAFORM_BUCKET_PATH` (see `infrastructure/.envrc`).
