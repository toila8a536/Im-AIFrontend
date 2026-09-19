# OnlineCompiler Documentation

Everything you need to integrate code execution into your application. One endpoint, 12 languages, real-time results.

## Base URL
```
https://api.onlinecompiler.io
```

## Authentication
All API requests require an API key passed in the `Authorization` header.
```http
Authorization: YOUR_API_KEY
```

### Key Types
There are two types of API keys, each scoped to specific endpoints:

| Key Type | Created From | Allowed Endpoints | Use Case |
|----------|--------------|-------------------|----------|
| API | API Keys page | REST API (sync & async) | Server-side integrations, scripts, AI agents |
| WebSocket | Widgets page | WebSocket & embeddable widget | Embedded editors, browser-based apps |

> **Why two types?** WebSocket keys are embedded in public HTML and visible to anyone. Separating key types ensures a scraped widget key cannot be used to call the REST API directly. You can optionally restrict any key to a specific IP address or domain for additional security.

**How to get an API key:** Sign up at [api.onlinecompiler.io](https://api.onlinecompiler.io), navigate to **API Keys** (for REST API) or **Widgets** (for WebSocket/embeds), and create a key.

---

## Run Code (Async)

`POST /api/run-code/`

### Request Body
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| compiler | string | Yes | Compiler identifier (see list below) |
| code | string | Yes | Source code to execute (max 100KB) |
| input | string | No | Standard input for the program (max 100KB) |
| extra_params | object | No | Custom JSON data returned in the callback |

> **Async execution:** The API returns `202 Accepted` immediately with a queue ID. Results are delivered to your API key's redirect URL as a POST callback.

### Immediate Response (202)
```json
{ "status": "queued", "id": 42 }
```

### Callback POST Body
Once execution completes, results are POSTed to your API key's redirect URL:

```json
{
  "output": "Hello, World!\n",
  "error": "",
  "status": "success",
  "exit_code": 0,
  "signal": null,
  "time": "0.0248",
  "total": "0.0330",
  "memory": "8192",
  "extra_params": {}
}
```

| Field | Description |
|-------|-------------|
| output | Standard output (max 999 chars) |
| error | Standard error / compilation errors (max 999 chars) |
| status | `"success"` or `"error"` |
| exit_code | Process exit code (0 = success) |
| signal | Signal number if killed (e.g. 9 for SIGKILL), null otherwise |
| time | Execution time in seconds (excludes compilation) |
| total | Total time in seconds (includes compilation) |
| memory | Memory usage in KB |
| extra_params | Your custom data, passed through unchanged |

---

## Run Code (Sync) ✨ New

Execute code and get results in a single request. No callback URL needed — the response contains the execution output directly. Ideal for simple integrations, scripts, and AI agents.

`POST /api/run-code-sync/`

### Request Body
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| compiler | string | Yes | Compiler identifier (see list below) |
| code | string | Yes | Source code to execute (max 100KB) |
| input | string | No | Standard input for the program (max 100KB) |

### Response (200)
```json
{
  "output": "Hello, World!\n",
  "error": "",
  "status": "success",
  "exit_code": 0,
  "signal": null,
  "time": "0.0248",
  "total": "0.0330",
  "memory": "8192"
}
```

> ⚠️ **Note:** The sync endpoint blocks until execution completes (up to 30 seconds). For high-throughput or long-running code, use the async endpoint or WebSocket instead.

### Terminal Example
```bash
curl -X POST https://api.onlinecompiler.io/api/run-code-sync/ \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "compiler": "python-3.14",
    "code": "name = input()\nprint(f\"Hello, {name}!\")",
    "input": "World"
  }'
```

---

## Supported Compilers

| Language | Compiler ID |
|----------|-------------|
| Python 3.14 | `python-3.14` |
| C GCC 15 | `gcc-15` |
| C++ G++ 15 | `g++-15` |
| Java OpenJDK 25 | `openjdk-25` |
| C# .NET SDK 9 | `dotnet-csharp-9` |
| F# .NET SDK 9 | `dotnet-fsharp-9` |
| PHP 8.5 | `php-8.5` |
| Ruby 4.0 | `ruby-4.0` |
| Haskell GHC 9.12 | `haskell-9.12` |
| Go 1.26 | `go-1.26` |
| Rust 1.93 | `rust-1.93` |
| TypeScript Deno | `typescript-deno` |

`GET /api/compilers/` — Fetch this list programmatically. No authentication required.

---

## Exit Codes & Signals

The `exit_code` field contains the process exit code. A value of `0` means the program ran successfully. Any non-zero value indicates an error.

When `exit_code` is greater than 128, the process was killed by a signal. The `signal` field provides the signal number (i.e. `exit_code - 128`). When the process exits normally, `signal` is `null`.

| Exit Code | Signal | Meaning |
|-----------|--------|---------|
| 0 | null | Success |
| 1 | null | Runtime error (e.g. uncaught exception, assertion failure) |
| 2 | null | Misuse of command / invalid arguments |
| 137 | 9 (SIGKILL) | Killed — memory limit exceeded or timeout |
| 139 | 11 (SIGSEGV) | Segmentation fault — invalid memory access |
| 124 | null | Timeout — execution exceeded the 30-second limit |

---

## WebSocket (Real-time)

For real-time results without polling, connect via Socket.IO. The WebSocket server authenticates your API key, forwards code to the execution engine, and pushes results back instantly.

> ⚠️ **Requires a WebSocket key.** Create one from the Widgets page in your dashboard. REST API keys will not work for WebSocket connections.

**WebSocket URL:** `wss://api.onlinecompiler.io`  
**Emit Event:** `runcode`  
**Listen Event:** `codeoutput`

### websocket-client.js
```javascript
import { io } from "socket.io-client";

const socket = io("wss://api.onlinecompiler.io", {
  auth: { token: "YOUR_API_KEY" }
});

socket.on("connect", () => {
  socket.emit("runcode", {
    api_key: "YOUR_API_KEY",
    compiler: "python-3.14",
    code: 'print("Hello via WebSocket!")',
    input: ""
  });
});

socket.on("codeoutput", (result) => {
  console.log(result.output);    // "Hello via WebSocket!"
  console.log(result.error);     // ""
  console.log(result.status);    // "success"
  console.log(result.exit_code); // 0
  console.log(result.signal);    // null
  console.log(result.time);      // "0.0248"
  console.log(result.total);     // "0.0330"
  console.log(result.memory);    // "8192"
});
```

---

## Embeddable Widget

Drop a fully-featured code editor into any webpage with a single script tag. The widget includes a CodeMirror 6 editor with syntax highlighting, language selector, stdin input, and real-time execution via WebSocket. It uses Shadow DOM for complete style isolation.

> ⚠️ **Requires a WebSocket key.** Create one from the Widgets page in your dashboard. Widget keys are safe to embed in public HTML — they cannot be used to call the REST API.

### Quick Start
```html
<!-- 1. Add the widget script (before </body>) -->
<script src="https://onlinecompiler.io/widget.js"></script>

<!-- 2. Add a div with your API key -->
<div class="runcode"
  data-key="YOUR_API_KEY"
  data-lang="python-3.14">
</div>
```

### Configuration
Configure each widget instance using `data-*` attributes:

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| data-key | Yes | - | Your API key |
| data-lang | No | python-3.14 | Default language (any compiler key) |
| data-theme | No | dark | `dark` or `light` |
| data-height | No | 400 | Editor height in pixels |

### Multiple Widgets
Add as many widgets as you need. Use `class="runcode"` for multiple widgets or `id="runcode"` for a single one. Each widget operates independently.

```html
<!-- Dark theme, 400px height -->
<div class="runcode"
  data-key="YOUR_API_KEY"
  data-lang="python-3.14"
  data-theme="dark"
  data-height="400">
</div>

<!-- Light theme, 300px height, Java -->
<div class="runcode"
  data-key="YOUR_API_KEY"
  data-lang="openjdk-25"
  data-theme="light"
  data-height="300">
</div>

<script src="https://onlinecompiler.io/widget.js"></script>
```

**Features included:** CodeMirror 6 editor with syntax highlighting for all 12 languages, language selector dropdown, stdin input panel, run/stop button with keyboard shortcut (Ctrl+Enter), connection status indicator, execution output with CPU/memory stats, and light/dark themes.

---

## MCP (AI Agents) ✨ New

Connect AI assistants like Claude, Cursor, VS Code Copilot, and any MCP-compatible client directly to OnlineCompiler.io. No SDK to install — just add a URL.

**MCP URL:** `https://api.onlinecompiler.io/mcp`

The server exposes two tools: `list_compilers` and `run_code`. Authentication uses your API key as a Bearer token.

### Claude Code
```bash
claude mcp add onlinecompiler https://api.onlinecompiler.io/mcp --transport http --header "Authorization: Bearer YOUR_API_KEY"
```

### VS Code / Cursor
Add to `.vscode/mcp.json` or `.cursor/mcp.json`:
```json
{
  "servers": {
    "onlinecompiler": {
      "url": "https://api.onlinecompiler.io/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

### Claude Desktop
Add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "onlinecompiler": {
      "url": "https://api.onlinecompiler.io/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

> Requires an API key. Create one from the API Keys page in your dashboard. The same API key works for both REST API and MCP.

---

## Limits & Constraints

| Resource | Limit |
|----------|-------|
| Memory | 512 MB per execution |
| CPU | 2 cores |
| Timeout | 30 seconds |
| Max Processes | 64 PIDs |
| Network | Disabled (no outbound access) |
| Code Size | 100 KB max |
| Input Size | 100 KB max |
| Output | Truncated at 999 characters |
| Sync Concurrency | 4 concurrent requests max (returns 429 when at capacity) |
| WebSocket Rate | 1 execution per second per connection |