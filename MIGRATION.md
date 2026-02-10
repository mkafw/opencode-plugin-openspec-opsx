# OPSX Migration Summary

This document summarizes the changes made to migrate `opencode-plugin-openspec` from legacy OpenSpec support to full OPSX workflow support.

## Version Bump
- **Old**: 0.1.2
- **New**: 0.2.0

## Key Changes

### 1. Project Detection (`src/utils/detection.ts`)

**Added:**
- `isOPSXProject()` function to detect OPSX-specific indicators:
  - `.openspec/` directory (change tracking)
  - `openspec/config.yaml` (project configuration)
  - `openspec/schemas/` directory (custom schemas)
- Enhanced `isOpenSpecProject()` to detect:
  - `.openspec/` directory
  - `openspec/` directory (general indicator)

### 2. System Prompt (`src/prompts.ts`)

**Replaced** legacy prompt with comprehensive OPSX system prompt including:
- OPSX concepts (Artifacts, Actions, Dependencies, Fluid Workflow)
- OPSX commands reference table
- Detailed rules for OPSX workflow
- Workflow guidance for each command
- Update vs New Change decision criteria

**Maintains backward compatibility** by exporting `OPENSPEC_SYSTEM_PROMPT` as alias.

### 3. Configuration (`src/config.ts`)

**Major enhancements:**
- **Dynamic agent selection**: 
  - OPSX projects → `opsx-architect` agent (cyan color)
  - Legacy projects → `openspec-plan` agent (red color)
- **Expanded permissions** for OPSX files:
  - `.openspec/**` (change tracking)
  - `openspec/config.yaml` and YAML files
  - `openspec/schemas/**` and `templates/**`
  - `proposal.md`, `design.md`, `tasks.md`
- **OPSX commands** (7 new commands):
  - `opsx:explore` - Think through ideas
  - `opsx:new` - Start a new change
  - `opsx:continue` - Create next artifact
  - `opsx:ff` - Fast-forward all artifacts
  - `opsx:apply` - Implement tasks
  - `opsx:sync` - Sync specs to main
  - `opsx:archive` - Archive when done

### 4. Main Entry (`src/index.ts`)

- Updated JSDoc comments to reflect OPSX support
- Enhanced plugin description

### 5. Package Metadata (`package.json`)

**Updated:**
- Version: 0.1.2 → 0.2.0
- Description to mention OPSX workflow
- Keywords added: `opsx`, `specification`

### 6. Documentation (`README.md`)

**Complete rewrite** including:
- OPSX introduction and comparison to legacy
- Feature matrix (OPSX vs Legacy)
- OPSX commands table
- Updated installation instructions
- Migration guide from legacy to OPSX
- Changelog section

## File Structure

```
opencode-plugin-openspec/
├── package.json           # Updated version and metadata
├── README.md             # Complete documentation rewrite
├── tsconfig.json         # Unchanged
├── .gitignore           # Added
└── src/
    ├── index.ts          # Updated JSDoc
    ├── config.ts         # Major enhancements (OPSX support)
    ├── prompts.ts        # New OPSX system prompt
    └── utils/
        ├── index.ts      # New exports
        └── detection.ts  # Enhanced detection + isOPSXProject()
```

## Backward Compatibility

✅ **Fully backward compatible:**
- Legacy OpenSpec projects still work
- `openspec-plan` agent available for legacy projects
- Original detection logic preserved as fallback

## Testing Checklist

- [ ] Legacy OpenSpec project detection works
- [ ] OPSX project detection works (`.openspec/`, `config.yaml`)
- [ ] Correct agent selected for each project type
- [ ] OPSX commands available only for OPSX projects
- [ ] Permissions work for all file patterns
- [ ] Build succeeds (`bun run build`)

## Migration Path for Users

1. **Plugin users**: No action needed - plugin auto-detects project type
2. **Legacy → OPSX**: Run `openspec init` in their project
3. **New OPSX projects**: Use `openspec init` to set up

## References

- [OPSX Documentation](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md)
- [OpenSpec Repository](https://github.com/Fission-AI/OpenSpec)
