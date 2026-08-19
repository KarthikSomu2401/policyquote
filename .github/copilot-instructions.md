## Mandatory AGENT_LOG.md logging

For every Copilot Chat, Agent Chat, or Inline Chat request that makes a meaningful repository change, update `AGENT_LOG.md`.

This includes:
- Creating, modifying, deleting, renaming, or moving files.
- Changing application behaviour, dependencies, configuration, tests, documentation, or CI/CD.
- Refactoring code or changing architecture.
- Running commands that materially affect the implementation.
- Fixing bugs or responding to review feedback.

After completing the request:

1. Append exactly one entry to `AGENT_LOG.md`.
2. Preserve all existing entries and their order.
3. Record the exact user prompt, redacting secrets as `[REDACTED]`.
4. Summarize the output received and decisions made.
5. List every file changed.
6. Explain why the change was made.
7. Record tests, builds, linting, type checks, and manual validation.
8. Never claim validation succeeded unless it actually ran.
9. If the request failed or was interrupted, record the partial work and failure.
10. Do not log passwords, tokens, API keys, private keys, or other secrets.

Use this format:

# Agent Log

## YYYY-MM-DD HH:mm — Short title

### Prompt given

> The user's prompt, with sensitive values replaced by `[REDACTED]`.

### Output received

Summary of the agent's response, decisions, commands, and results.

### What changed

- `path/to/file`: description of the change.
- `AGENT_LOG.md`: appended this entry.

### Why

Purpose and reasoning for the change.

### Validation

- Tests, builds, linting, type checks, or manual checks performed.
- If none were run: `Not run — [reason].`

### Notes

Assumptions, limitations, rejected alternatives, or follow-up work. Use `None` if not applicable.