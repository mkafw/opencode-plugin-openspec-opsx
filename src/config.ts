import type { Hooks } from "@opencode-ai/plugin";
import { isOpenSpecProject, isOPSXProject } from "./utils/detection";
import { OPSX_SYSTEM_PROMPT } from "./prompts";

export function createConfigHook(ctx: { directory: string }): Hooks["config"] {
  return async (config) => {
    // 1. Check if this is an OpenSpec project
    const mockCtx = { directory: ctx.directory } as any;
    
    const isActive = await isOpenSpecProject(mockCtx);
    if (!isActive) {
      return;
    }

    // 2. Detect if using OPSX workflow
    const isOPSX = await isOPSXProject(mockCtx);

    // 3. Define the OpenSpec/OPSX Architect Agent
    const agentName = isOPSX ? "opsx-architect" : "openspec-plan";
    const agentDescription = isOPSX 
      ? "OPSX Architect - Fluid, iterative architecture planning with OPSX workflow"
      : "OpenSpec Architect - Plan and specify software architecture";

    const openSpecAgent = {
      name: agentName,
      mode: "primary",
      description: agentDescription,
      prompt: OPSX_SYSTEM_PROMPT,
      permission: {
        edit: {
          // Allow editing OPSX/OpenSpec config files
          "openspec/config.yaml": "allow",
          "openspec/**/*.yaml": "allow",
          "openspec/**/*.yml": "allow",
          
          // Allow editing change tracking
          ".openspec/**": "allow",
          
          // Allow editing schema files
          "openspec/schemas/**": "allow",
          "openspec/templates/**": "allow",
          
          // Allow editing legacy OpenSpec files
          "openspec/AGENTS.md": "allow",
          "AGENTS.md": "allow",
          
          // Allow editing proposal
          "proposal.md": "allow",
          
          // Allow editing design
          "design.md": "allow",
          
          // Allow editing tasks
          "tasks.md": "allow",
          
          // Allow editing specs
          "specs/**": "allow",
          "spec/**/*.md": "allow",
          
          // Allow editing project-level files
          "project.md": "allow"
        }
      },
      color: isOPSX ? "#00D9FF" : "#FF6B6B" // Cyan for OPSX, Red for legacy
    };

    // 4. Add OPSX commands if using OPSX workflow
    if (isOPSX) {
      const opsxCommands = {
        "opsx:explore": {
          description: "Think through ideas, investigate problems, clarify requirements",
          prompt: `Use /opsx:explore to help the user think through their ideas before committing to a change.

This is a free-form exploration phase - no structure required. Help them:
- Clarify requirements
- Compare different approaches
- Identify potential issues
- Gather information

When insights crystallize, suggest transitioning to /opsx:new or /opsx:ff.`
        },
        "opsx:new": {
          description: "Start a new change",
          prompt: `Use /opsx:new to scaffold a new change.

This will:
1. Ask the user what they want to build
2. Ask which workflow schema to use (default: spec-driven)
3. Create the initial change structure

Guide them through the setup process.`
        },
        "opsx:continue": {
          description: "Create the next artifact based on dependencies",
          prompt: `Use /opsx:continue to create the next artifact that is ready.

This command:
1. Checks the current state of the change
2. Shows what's ready to create (based on dependencies)
3. Creates ONE artifact at a time

Dependencies flow: proposal → specs → design → tasks

Use this repeatedly to build up the change incrementally.`
        },
        "opsx:ff": {
          description: "Fast-forward - create all planning artifacts at once",
          prompt: `Use /opsx:ff <change-name> to create all planning artifacts at once.

This is useful when:
- The user has a clear picture of what they're building
- They want to speed through the planning phase
- They're comfortable with the OPSX workflow

Example: /opsx:ff add-dark-mode`
        },
        "opsx:apply": {
          description: "Implement tasks, updating artifacts as needed",
          prompt: `Use /opsx:apply to work through implementation tasks.

This command:
1. Reads the tasks.md file
2. Works through unchecked tasks
3. Marks them complete as you go

**Important**: OPSX is fluid! If you discover something is wrong during implementation:
- Fix the artifact (design.md, specs, etc.)
- Continue implementing
- The workflow adapts to reality

Use /opsx:apply <name> if juggling multiple changes.`
        },
        "opsx:sync": {
          description: "Sync delta specs to main",
          prompt: `Use /opsx:sync to sync delta specifications to the main branch.

This is an optional step for when specs need to be merged back to main.`
        },
        "opsx:archive": {
          description: "Archive when done",
          prompt: `Use /opsx:archive to archive the change when done.

This will:
1. Prompt to sync specs if needed
2. Move the change to the archive
3. Mark it as complete`
        }
      };

      // Merge OPSX commands into config
      const commandsConfig = (config.commands || {}) as any;
      Object.assign(commandsConfig, opsxCommands);
      config.commands = commandsConfig;
    }

    // 5. Inject into configuration
    const agentConfig = (config.agent || {}) as any;
    agentConfig[agentName] = openSpecAgent;
    config.agent = agentConfig;
  };
}
