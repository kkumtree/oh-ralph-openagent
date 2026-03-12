export const AGENT_NAME_MAP: Record<string, string> = {
  // Sisyphus variants → "sisyphus-light"
  omo: "sisyphus-light",
  OmO: "sisyphus-light",
  Sisyphus: "sisyphus-light",
  sisyphus-light: "sisyphus-light",

  // Prometheus variants → "prometheus-light"
  "OmO-Plan": "prometheus-light",
  "omo-plan": "prometheus-light",
  "Planner-Sisyphus": "prometheus-light",
  "planner-sisyphus-light": "prometheus-light",
  "Prometheus (Planner)": "prometheus-light",
  prometheus-light: "prometheus-light",

  // Atlas variants → "atlas-light"
  "orchestrator-sisyphus-light": "atlas-light",
  Atlas: "atlas-light",
  atlas-light: "atlas-light",

  // Metis variants → "metis-light"
  "plan-consultant": "metis-light",
  "Metis (Plan Consultant)": "metis-light",
  metis-light: "metis-light",

  // Momus variants → "momus-light"
  "Momus (Plan Reviewer)": "momus-light",
  momus-light: "momus-light",

  // Sisyphus-Junior → "sisyphus-light-junior"
  "Sisyphus-Junior": "sisyphus-light-junior",
  "sisyphus-light-junior": "sisyphus-light-junior",

  // Already lowercase - passthrough
  build: "build",
  oracle-light: "oracle-light",
  librarian-light: "librarian-light",
  explore-light: "explore-light",
  "multimodal-looker-light": "multimodal-looker-light",
}

export const BUILTIN_AGENT_NAMES = new Set([
  "sisyphus-light", // was "Sisyphus"
  "oracle-light",
  "librarian-light",
  "explore-light",
  "multimodal-looker-light",
  "metis-light", // was "Metis (Plan Consultant)"
  "momus-light", // was "Momus (Plan Reviewer)"
  "prometheus-light", // was "Prometheus (Planner)"
  "atlas-light", // was "Atlas"
  "build",
])

export function migrateAgentNames(
  agents: Record<string, unknown>
): { migrated: Record<string, unknown>; changed: boolean } {
  const migrated: Record<string, unknown> = {}
  let changed = false

  for (const [key, value] of Object.entries(agents)) {
    const newKey = AGENT_NAME_MAP[key.toLowerCase()] ?? AGENT_NAME_MAP[key] ?? key
    if (newKey !== key) {
      changed = true
    }
    migrated[newKey] = value
  }

  return { migrated, changed }
}
