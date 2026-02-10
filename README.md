# opencode-plugin-openspec

An OpenCode plugin that integrates OpenSpec with full **OPSX** workflow support, providing a dedicated agent for fluid, iterative architecture planning and specification.

## What's OPSX?

OPSX (OpenSpec Extended) is the new standard workflow for OpenSpec. It's a **fluid, iterative workflow** that replaces the rigid phase-based approach.

### Why OPSX?

```
Legacy workflow:                      OPSX:
┌────────────────────────┐           ┌────────────────────────┐
│  Hardcoded in package  │           │  schema.yaml           │◄── You edit this
│  (can't change)        │           │  templates/*.md        │◄── Or this
│        ↓               │           │        ↓               │
│  Wait for new release  │           │  Instant effect        │
│        ↓               │           │        ↓               │
│  Hope it's better      │           │  Test it yourself      │
└────────────────────────┘           └────────────────────────┘
```

**OPSX opens it up.** Now anyone can:

1. **Experiment with instructions** — edit a template, see if the AI does better
2. **Test granularly** — validate each artifact's instructions independently
3. **Customize workflows** — define your own artifacts and dependencies
4. **Iterate quickly** — change a template, test immediately, no rebuild

### Workflow Comparison

```
Legacy OpenSpec:                    OPSX:
┌────────────────────┐              ┌────────────────────┐
│  Fixed phases      │              │  Fluid actions     │
│  plan → apply      │      →       │  explore, new,     │
│  → archive         │              │  continue, apply,  │
│                    │              │  archive           │
│  All-or-nothing    │              │  Do any, anytime   │
└────────────────────┘              └────────────────────┘
```

### Key Improvements

- **Actions, not phases** — explore, create, implement, update, archive — do any of them anytime
- **Granular control** — create artifacts one at a time OR fast-forward all at once
- **Natural iteration** — update specs/design during implementation as you learn
- **Custom schemas** — define your own artifacts and dependencies
- **Better AI integration** — structured data, rich context, dependency awareness

[Learn more about OPSX](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md)

## Features

### Auto-Detection
Automatically detects OpenSpec projects by checking for:
- `openspec/config.yaml` (OPSX format)
- `.openspec/` directory (OPSX change tracking)
- `openspec/AGENTS.md` (Legacy format)
- `openspec/` directory (General indicator)

### Dedicated Agent
Two agent modes depending on project type:

| Project Type | Agent Name | Description | Color |
|--------------|------------|-------------|-------|
| OPSX | `opsx-architect` | Fluid, iterative architecture planning | Cyan (#00D9FF) |
| Legacy | `openspec-plan` | Standard OpenSpec planning | Red (#FF6B6B) |

### OPSX Commands (OPSX projects only)

| Command | Description |
|---------|-------------|
| `/opsx:explore` | Think through ideas, investigate problems, clarify requirements |
| `/opsx:new` | Start a new change |
| `/opsx:continue` | Create the next artifact based on dependencies |
| `/opsx:ff <name>` | Fast-forward — create all planning artifacts at once |
| `/opsx:apply` | Implement tasks, updating artifacts as needed |
| `/opsx:sync` | Sync delta specs to main |
| `/opsx:archive` | Archive when done |

### Smart Permissions

**Write access granted for:**
- `.openspec/**` — OPSX change tracking
- `openspec/config.yaml` — Project configuration
- `openspec/schemas/**` — Custom schemas
- `openspec/templates/**` — Schema templates
- `openspec/AGENTS.md`, `AGENTS.md` — Agent definitions
- `proposal.md` — Change proposals
- `design.md` — Technical designs
- `tasks.md` — Implementation tasks
- `specs/**` — Specifications
- `spec/**/*.md` — Specification files
- `project.md` — Project documentation

**Read-only for:** Implementation code (TypeScript, Python, etc.) — ensures planning phase stays separate from implementation.

## Installation

### For Humans

**Option 1: Let your agent do it (Recommended)**

Copy and paste this prompt to your LLM agent (Claude Code, AmpCode, Cursor, etc.):

```
Install opencode-plugin-openspec by following the instructions here:
https://raw.githubusercontent.com/Octane0411/opencode-plugin-openspec/main/README.md
```

**Option 2: Manual Installation**

Add the plugin package name to your `opencode.json` configuration file (usually located at `~/.config/opencode/opencode.json` or `.opencode/opencode.json`):

```json
{
  "plugin": [
    "opencode-plugin-openspec"
  ]
}
```

OpenCode will automatically download and install the plugin the next time it runs.

### For LLM Agents

If you are an AI agent tasked with setting up this plugin, follow these steps:

**IMPORTANT**: Do NOT run `npm install` or any terminal commands. You only need to edit the configuration file.

1.  **Locate Configuration**: Find the user's OpenCode configuration file. It is typically at `~/.config/opencode/opencode.json` or `.opencode/opencode.json` in the workspace root.
2.  **Read Configuration**: Read the content of the configuration file.
3.  **Update Configuration**: Add `"opencode-plugin-openspec"` to the `plugin` array. If the `plugin` array does not exist, create it.
    ```json
    {
      "plugin": [
        "opencode-plugin-openspec"
      ]
    }
    ```
4.  **Verify**: Inform the user that the plugin has been added and will be installed on the next OpenCode run.

    > **Note**: You do not need to run `npm install` or download the package manually. OpenCode will automatically fetch the plugin based on the configuration.

## Usage

### For OPSX Projects

1. Open an OPSX project in OpenCode (one with `openspec/config.yaml` or `.openspec/` directory).
2. The plugin will automatically detect the OPSX structure.
3. Switch to the **OPSX Architect** agent (colored cyan) in the agent selector.
4. Use OPSX commands to work fluidly:
   - Start with `/opsx:explore` to think through ideas
   - Use `/opsx:new` to start a change
   - Use `/opsx:continue` or `/opsx:ff` for planning
   - Use `/opsx:apply` for implementation
   - Use `/opsx:archive` when done

### For Legacy OpenSpec Projects

1. Open an OpenSpec project in OpenCode.
2. The plugin will automatically detect the project structure.
3. Switch to the **OpenSpec Architect** agent (colored red) in the agent selector.
4. Start planning your architecture! The agent will have access to modify your spec files while keeping your code safe.

## Migration from Legacy OpenSpec

If you have an existing OpenSpec project and want to upgrade to OPSX:

```bash
# Install openspec CLI
npm install -g @fission-ai/openspec

# Initialize OPSX in your project
openspec init
```

This will:
- Create `openspec/config.yaml` for project configuration
- Set up `.openspec/` for change tracking
- Generate skills in `.claude/skills/` (or equivalent)

[Full migration guide](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md#setup)

## Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Octane0411/opencode-plugin-openspec.git
   cd opencode-plugin-openspec
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Build the plugin:
   ```bash
   bun run build
   ```

4. Run watch mode for development:
   ```bash
   bun run watch
   ```

## Changelog

### 0.2.0
- ✨ Full OPSX workflow support
- ✨ New `opsx-architect` agent for OPSX projects
- ✨ OPSX commands: `/opsx:explore`, `/opsx:new`, `/opsx:continue`, `/opsx:ff`, `/opsx:apply`, `/opsx:sync`, `/opsx:archive`
- ✨ Enhanced project detection (OPSX vs Legacy)
- ✨ Smart agent selection based on project type
- ✨ Updated permissions for OPSX files

### 0.1.2
- Initial release
- Legacy OpenSpec support
- `openspec-plan` agent

## License

MIT

## Links

- [OpenSpec Repository](https://github.com/Fission-AI/OpenSpec)
- [OPSX Documentation](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md)
- [Plugin Repository](https://github.com/Octane0411/opencode-plugin-openspec)
