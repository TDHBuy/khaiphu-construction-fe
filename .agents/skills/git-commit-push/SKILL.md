---
name: git-commit-push
description: "Commit and push repository changes using Conventional Commits, then verify that the push succeeded."
---

# Git Commit & Push

Use this skill when the user asks to commit and/or push changes.

## Workflow

1. Check the repository with `git status`, the current branch, the configured remote, and `git diff`.
2. Review the changes and stage only relevant files. Never commit secrets, credentials, API keys, or `.env` files.
3. Create a concise Conventional Commit with scope:

   ```text
   type(scope): description
   ```

   Examples include `feat(auth): add login flow`, `fix(api): handle invalid request`, and `chore(deps): update dependencies`.
4. Push to the current remote and branch.
5. Never use `--force` or rewrite history automatically.
6. Verify after pushing with:

   ```bash
   git status
   git log -1 --oneline
   git branch -vv
   ```

Only report success after confirming that the push completed successfully.

## Failure Handling

If commit or push fails, clearly report what failed and show the relevant error. Do not perform destructive Git operations automatically or claim success.

## Final Response

Keep the response concise:

```text
Commit: <commit message>
Branch: <branch>
Push: SUCCESS / FAILED
Status: <clean / remaining changes>
```
