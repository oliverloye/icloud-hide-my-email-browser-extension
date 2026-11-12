# iCloud Hide My Email browser extension (personal fork)

Olli's personal fork of dedoussis/icloud-hide-my-email-browser-extension: an unofficial MV3 extension (TypeScript, React, webpack) for iCloud's Hide My Email. Built for one user and loaded unpacked in Chrome/Edge; it is not published to any store.

Keep this file under 100 lines. Facts only: purpose, terms, commands, where things live. Procedures go in skills; rules that must hold go in `.claude/settings.json` or `.githooks/`.

## Guards

| Rule                                                   | Enforced by                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Never force-push or delete `main`                      | `.githooks/pre-push`; deny rules in `.claude/settings.json`                          |
| Every change reaches `main` through a pull request     | `.githooks/pre-push` (`.githooks/guard.conf` protects every path)                    |
| No secrets in files, commands, logs or replies         | `.gitignore` for `.env*`; review                                                     |
| Never weaken or skip a test to make a check pass       | review                                                                               |
| The extension contacts no host other than `icloud.com` | review (`host_permissions` in `src/manifest.json` limits credentialed requests only) |

## How work flows

1. Read the issue or request, `git status`, and any open pull request.
2. Code change: branch, change with a test, open a pull request, let the `check` workflow run, merge when green.
3. Research, notes or data, including scheduled runs: push a branch and open a pull request for the owner to review.
4. A new skill or agent goes in `.claude/skills/` or `.claude/agents/`; its pull request names the failure it fixes. Files listed in `.claude/vendor.json` come from workbench: change them there, not here.

## Terms

- HME: a Hide My Email address. "Generate" proposes one; "reserve" saves it to the iCloud account.
- The extension has no login of its own. It reuses the browser's icloud.com session cookies.

## Commands

- Install: `npm ci` (Node 22, see `.nvmrc`)
- Build: `npm run build` (output in `build/`, which is not committed; load that folder unpacked)
- Checks: `npm run lint && npm run prettier:check && npx tsc --noEmit -p . && npm run build`
- Format: `npm run prettier`

There is no unit test suite. Behaviour is verified by loading `build/` in Chromium.

## Where things live

| Path                                         | Holds                                                                                          |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/manifest.json`                          | permissions, content script matches; `version` is injected from `package.json` at build        |
| `src/iCloudClient.ts`                        | the only `fetch` in the project; all iCloud API calls                                          |
| `src/pages/Background/`                      | service worker: header rewrite rule, context menu, messages from the content script, auth sync |
| `src/pages/Content/`                         | content script: the autofill button next to email fields                                       |
| `src/pages/Popup/`, `Options/`, `Userguide/` | React pages                                                                                    |
| `src/storage.ts`, `src/messages.ts`          | `storage.local` schema; message types between background and content script                    |
| `webpack.config.js`, `utils/`                | build and dev server                                                                           |
