# Sarah's Kitchen Frontend Backup - Lessons Learned

Last updated: 2026-06-24

## Session lessons

1. ESLint was blocking release readiness more because of state lifecycle patterns than syntax errors.
2. Lazy `useState` initialization is the cleaner approach for restoring browser-persisted state in this codebase.
3. Context files that export hooks/providers together can trigger Fast Refresh lint rules; document the exception rather than fight the structure blindly.
4. The menu depends on the live products context, so memo dependencies must follow the context value and not the original seed constant.

## Risks to remember

1. This branch currently behaves like a polished frontend prototype, not a fully integrated commerce app.
2. LocalStorage is fine for demos and rapid UX iteration, but it is not a production persistence layer.
3. Checkout currently simulates payment timing; any production handoff must replace that behavior first.
4. Because the folder is not a Git repository yet, change history is fragile unless backups are kept current.

## Recommended next moves

1. Keep this branch focused on frontend excellence and interaction quality.
2. Delay backend coupling until the design is truly preferred over the main branch.
3. When ready, integrate through narrow service modules instead of pushing fetch logic across many pages/components.
