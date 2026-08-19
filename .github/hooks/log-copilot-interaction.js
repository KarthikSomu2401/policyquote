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

  if (!fs.existsSync(logPath)) {
    fs.writeFileSync(
      logPath,
      "# Agent Log\n\nThis file records significant Copilot interactions.\n",
      "utf8"
    );
  }

  const logContents = fs.readFileSync(logPath, "utf8");

  const timestampPattern = /^## (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} UTC) — /gm;
  let lastTimestamp = null;
  let match;

  while ((match = timestampPattern.exec(logContents)) !== null) {
    lastTimestamp = new Date(match[1]);
  }

  const timestampDate = new Date();
  if (lastTimestamp && timestampDate <= lastTimestamp) {
    timestampDate.setTime(lastTimestamp.getTime() + 1000);
  }

  const timestamp = timestampDate
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d{3}Z$/, " UTC");

  const eventText = JSON.stringify(event, null, 2)
    .replace(
      /(["']?(?:token|password|secret|api[_-]?key|private[_-]?key)["']?\s*:\s*)(["'][^"']*["']|[^,\n}]+)/gi,
      "$1[REDACTED]"
    );

  const entry = `

## ${timestamp} — Copilot interaction

### Timestamp

${timestamp}

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