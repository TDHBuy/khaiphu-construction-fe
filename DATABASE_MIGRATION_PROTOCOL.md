# Database Migration Protocol

For every schema change:

1. Create a migration.
2. Review existing data.
3. Review constraints, indexes, foreign keys and RLS.
4. Check application compatibility.
5. Prefer backward-compatible changes.
6. Validate the migration locally/staging when available.
7. Apply to production using the project's migration workflow.
8. Verify application behavior after deployment.

For risky/destructive changes:

- Prefer Expand → Migrate → Contract.
- Define recovery/rollback strategy.
- Do not combine incompatible application and database changes.
