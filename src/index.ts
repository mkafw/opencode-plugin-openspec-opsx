import type { Plugin } from "@opencode-ai/plugin";
import { createConfigHook } from "./config";
import { isOpenSpecProject } from "./utils/detection";

/**
 * OpenSpec Plugin for OpenCode
 * 
 * Integrates OPSX (OpenSpec Extended) workflow for fluid, iterative
 * architecture planning and specification.
 * 
 * Features:
 * - Auto-detection of OpenSpec/OPSX projects
 * - Dedicated agent for planning (openspec-plan or opsx-architect)
 * - OPSX commands for fluid workflow (/opsx:explore, /opsx:new, etc.)
 * - Smart permissions for spec files vs implementation code
 */
const OpenSpecPlugin: Plugin = async (ctx) => {
  const isActive = await isOpenSpecProject(ctx);

  if (!isActive) {
    return {};
  }

  return {
    config: createConfigHook(ctx),
  };
};

export default OpenSpecPlugin;
