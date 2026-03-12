import { describe, it, expect } from "bun:test"
import { remapAgentKeysToDisplayNames } from "./agent-key-remapper"

describe("remapAgentKeysToDisplayNames", () => {
  it("remaps known agent keys to display names", () => {
    // given agents with lowercase keys
    const agents = {
      sisyphus-light: { prompt: "test", mode: "primary" },
      oracle-light: { prompt: "test", mode: "subagent" },
    }

    // when remapping
    const result = remapAgentKeysToDisplayNames(agents)

    // then known agents get display name keys only
    expect(result["Sisyphus (Ultraworker)"]).toBeDefined()
    expect(result["oracle-light"]).toBeDefined()
    expect(result["sisyphus-light"]).toBeUndefined()
  })

  it("preserves unknown agent keys unchanged", () => {
    // given agents with a custom key
    const agents = {
      "custom-agent": { prompt: "custom" },
    }

    // when remapping
    const result = remapAgentKeysToDisplayNames(agents)

    // then custom key is unchanged
    expect(result["custom-agent"]).toBeDefined()
  })

  it("remaps all core agents to display names", () => {
    // given all core agents
    const agents = {
      sisyphus-light: {},
      hephaestus-light: {},
      prometheus-light: {},
      atlas-light: {},
      metis-light: {},
      momus-light: {},
      "sisyphus-light-junior": {},
    }

    // when remapping
    const result = remapAgentKeysToDisplayNames(agents)

    // then all get display name keys without lowercase duplicates
    expect(result["Sisyphus (Ultraworker)"]).toBeDefined()
    expect(result["sisyphus-light"]).toBeUndefined()
    expect(result["Hephaestus (Deep Agent)"]).toBeDefined()
    expect(result["hephaestus-light"]).toBeUndefined()
    expect(result["Prometheus (Plan Builder)"]).toBeDefined()
    expect(result["prometheus-light"]).toBeUndefined()
    expect(result["Atlas (Plan Executor)"]).toBeDefined()
    expect(result["atlas-light"]).toBeUndefined()
    expect(result["Metis (Plan Consultant)"]).toBeDefined()
    expect(result["metis-light"]).toBeUndefined()
    expect(result["Momus (Plan Critic)"]).toBeDefined()
    expect(result["momus-light"]).toBeUndefined()
    expect(result["Sisyphus-Junior"]).toBeDefined()
    expect(result["sisyphus-light-junior"]).toBeUndefined()
  })
})
