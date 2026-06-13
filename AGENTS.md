# AGENTS.md

## File Management Rules

- Use canonical file names only.
- Do not create or keep duplicate files with suffixes such as `(1)`, `(2)`, `(3)`, `Copy`, or ` 2`.
- When editing an existing specification or source file, update the canonical file directly.
- If iCloud or Obsidian creates a duplicate file, compare it with the canonical file before finishing work.
- If the duplicate has no unique required content, remove the duplicate and keep the canonical file.
- If the duplicate contains required newer content, merge that content into the canonical file first, then remove the duplicate.
- Do not finish implementation with duplicate specification files in `docs`.
- Do not finish implementation with duplicate source files in `src` or duplicate test files in `tests`.

## Documentation Rules

- `docs/*.md` files are the source of truth for project specifications.
- Each specification must exist under one canonical file name.
- Do not create alternate copies of an existing specification.
- New specifications may be added only when they describe a genuinely new domain or feature.

## Phase 1 MVP Constraints

- Do not change the scoring logic unless explicitly requested.
- Do not add external APIs.
- Do not add AI APIs.
- Do not add authentication.
- Do not add a database.
- Do not add payment flows to the MVP.
- Keep the app frontend-only and locally executable.
