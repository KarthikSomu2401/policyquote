const fs = require("node:fs");
const path = require("node:path");

let input = "";

process.stdin.setEncoding("utf8");

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  const repositoryRoot =
    process.env.GITHUB_WORKSPACE || process.env.CLAUDE_PROJECT_DIR || process.cwd();

  const logPath = path.join(repositoryRoot, "AGENT_LOG.md");

  let event = {};

  try {
    event = JSON.parse(input || "{}");
  } catch {
    event = {
      rawInput: input
    };
  }

  const timestamp = new Date()
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d{3}Z$/, " UTC");

  const eventText = JSON.stringify(event, null, 2)
    .replace(
      /(["']?(?:token|password|secret|api[_-]?key|private[_-]?key)["']?\s*:\s*)(["'][^"']*["']|[^,\n}]+)/gi,
      "$1[REDACTED]"
    );

  if (!fs.existsSync(logPath)) {
    fs.writeFileSync(
      logPath,
      "# Agent Log\n\nThis file records significant Copilot interactions.\n",
      "utf8"
    );
  }

  const entry = `

## ${timestamp} — Copilot interaction

### Prompt given

Review the associated Copilot chat request. Redact secrets as \`[REDACTED]\`.

### Output received

A Copilot post-tool interaction was recorded by the repository hook.

### What changed

Review the working-tree diff and list all files changed by this interaction.

### Why

Automatically record the Copilot interaction for repository traceability.

### Validation

Review the associated Copilot session for test, build, lint, type-check, and manual validation results.

### Notes

Hook event payload:

\`\`\`json
${eventText}
\`\`\`
`;

  fs.appendFileSync(logPath, entry, "utf8");
});