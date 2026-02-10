import type { PluginInput } from "@opencode-ai/plugin";
import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Checks if the current workspace is an OpenSpec project.
 *
 * Detection logic:
 * 1. Checks for `openspec/config.yaml` (Primary indicator - OPSX format)
 * 2. Checks for `.openspec/` directory (OPSX change tracking)
 * 3. Checks for `openspec/AGENTS.md` (Fallback - legacy format)
 * 4. Checks for `openspec/` directory (General OpenSpec indicator)
 */
export async function isOpenSpecProject(ctx: PluginInput): Promise<boolean> {
  const openspecDir = join(ctx.directory, "openspec");
  const dotOpenspecDir = join(ctx.directory, ".openspec");
  const configYamlPath = join(openspecDir, "config.yaml");
  const agentsMdPath = join(openspecDir, "AGENTS.md");

  // Check for OPSX project indicators
  if (existsSync(dotOpenspecDir)) {
    return true;
  }

  if (existsSync(configYamlPath)) {
    return true;
  }

  // Fallback to legacy detection
  if (existsSync(agentsMdPath)) {
    return true;
  }

  // Check if openspec directory exists at all
  return existsSync(openspecDir);
}

/**
 * Detects if the project uses the new OPSX workflow.
 * 
 * OPSX indicators:
 * - .openspec/ directory exists (change tracking)
 * - openspec/config.yaml exists (project configuration)
 * - openspec/schemas/ directory exists (custom schemas)
 */
export async function isOPSXProject(ctx: PluginInput): Promise<boolean> {
  const openspecDir = join(ctx.directory, "openspec");
  const dotOpenspecDir = join(ctx.directory, ".openspec");
  const configYamlPath = join(openspecDir, "config.yaml");
  const schemasDir = join(openspecDir, "schemas");

  return existsSync(dotOpenspecDir) || 
         existsSync(configYamlPath) || 
         existsSync(schemasDir);
}
