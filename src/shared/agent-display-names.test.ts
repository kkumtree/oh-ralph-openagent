import { describe, it, expect } from "bun:test"
import { AGENT_DISPLAY_NAMES, getAgentDisplayName, getAgentConfigKey } from "./agent-display-names"

describe("getAgentDisplayName", () => {
  it("returns display name for lowercase config key (new format)", () => {
    // given config key "sisyphus-light"
    const configKey = "sisyphus-light"

    // when getAgentDisplayName called
    const result = getAgentDisplayName(configKey)

    // then returns "Sisyphus (Ultraworker)"
    expect(result).toBe("Sisyphus (Ultraworker)")
  })

  it("returns display name for uppercase config key (old format - case-insensitive)", () => {
    // given config key "Sisyphus" (old format)
    const configKey = "Sisyphus"

    // when getAgentDisplayName called
    const result = getAgentDisplayName(configKey)

    // then returns "Sisyphus (Ultraworker)" (case-insensitive lookup)
    expect(result).toBe("Sisyphus (Ultraworker)")
  })

  it("returns original key for unknown agents (fallback)", () => {
    // given config key "custom-agent"
    const configKey = "custom-agent"

    // when getAgentDisplayName called
    const result = getAgentDisplayName(configKey)

    // then returns "custom-agent" (original key unchanged)
    expect(result).toBe("custom-agent")
  })

  it("returns display name for atlas-light", () => {
    // given config key "atlas-light"
    const configKey = "atlas-light"

    // when getAgentDisplayName called
    const result = getAgentDisplayName(configKey)

     // then returns "Atlas (Plan Executor)"
    expect(result).toBe("Atlas (Plan Executor)")
  })

  it("returns display name for prometheus-light", () => {
    // given config key "prometheus-light"
    const configKey = "prometheus-light"

    // when getAgentDisplayName called
    const result = getAgentDisplayName(configKey)

    // then returns "Prometheus (Plan Builder)"
    expect(result).toBe("Prometheus (Plan Builder)")
  })

  it("returns display name for sisyphus-light-junior", () => {
    // given config key "sisyphus-light-junior"
    const configKey = "sisyphus-light-junior"

    // when getAgentDisplayName called
    const result = getAgentDisplayName(configKey)

    // then returns "Sisyphus-Junior"
    expect(result).toBe("Sisyphus-Junior")
  })

  it("returns display name for metis-light", () => {
    // given config key "metis-light"
    const configKey = "metis-light"

    // when getAgentDisplayName called
    const result = getAgentDisplayName(configKey)

    // then returns "Metis (Plan Consultant)"
    expect(result).toBe("Metis (Plan Consultant)")
  })

  it("returns display name for momus-light", () => {
    // given config key "momus-light"
    const configKey = "momus-light"

    // when getAgentDisplayName called
    const result = getAgentDisplayName(configKey)

     // then returns "Momus (Plan Critic)"
    expect(result).toBe("Momus (Plan Critic)")
  })

  it("returns display name for oracle-light", () => {
    // given config key "oracle-light"
    const configKey = "oracle-light"

    // when getAgentDisplayName called
    const result = getAgentDisplayName(configKey)

    // then returns "oracle-light"
    expect(result).toBe("oracle-light")
  })

  it("returns display name for librarian-light", () => {
    // given config key "librarian-light"
    const configKey = "librarian-light"

    // when getAgentDisplayName called
    const result = getAgentDisplayName(configKey)

    // then returns "librarian-light"
    expect(result).toBe("librarian-light")
  })

  it("returns display name for explore-light", () => {
    // given config key "explore-light"
    const configKey = "explore-light"

    // when getAgentDisplayName called
    const result = getAgentDisplayName(configKey)

    // then returns "explore-light"
    expect(result).toBe("explore-light")
  })

  it("returns display name for multimodal-looker-light", () => {
    // given config key "multimodal-looker-light"
    const configKey = "multimodal-looker-light"

    // when getAgentDisplayName called
    const result = getAgentDisplayName(configKey)

    // then returns "multimodal-looker-light"
    expect(result).toBe("multimodal-looker-light")
  })
})

describe("getAgentConfigKey", () => {
  it("resolves display name to config key", () => {
    // given display name "Sisyphus (Ultraworker)"
    // when getAgentConfigKey called
    // then returns "sisyphus-light"
    expect(getAgentConfigKey("Sisyphus (Ultraworker)")).toBe("sisyphus-light")
  })

  it("resolves display name case-insensitively", () => {
    // given display name in different case
    // when getAgentConfigKey called
    // then returns "atlas-light"
    expect(getAgentConfigKey("atlas-light (plan executor)")).toBe("atlas-light")
  })

  it("passes through lowercase config keys unchanged", () => {
    // given lowercase config key "prometheus-light"
    // when getAgentConfigKey called
    // then returns "prometheus-light"
    expect(getAgentConfigKey("prometheus-light")).toBe("prometheus-light")
  })

  it("returns lowercased unknown agents", () => {
    // given unknown agent name
    // when getAgentConfigKey called
    // then returns lowercased
    expect(getAgentConfigKey("Custom-Agent")).toBe("custom-agent")
  })

  it("resolves all core agent display names", () => {
    // given all core display names
    // when/then each resolves to its config key
    expect(getAgentConfigKey("Hephaestus (Deep Agent)")).toBe("hephaestus-light")
    expect(getAgentConfigKey("Prometheus (Plan Builder)")).toBe("prometheus-light")
    expect(getAgentConfigKey("Atlas (Plan Executor)")).toBe("atlas-light")
    expect(getAgentConfigKey("Metis (Plan Consultant)")).toBe("metis-light")
    expect(getAgentConfigKey("Momus (Plan Critic)")).toBe("momus-light")
    expect(getAgentConfigKey("Sisyphus-Junior")).toBe("sisyphus-light-junior")
  })
})

describe("AGENT_DISPLAY_NAMES", () => {
  it("contains all expected agent mappings", () => {
    // given expected mappings
    const expectedMappings = {
      "sisyphus-light": "Sisyphus (Ultraworker)",
      "hephaestus-light": "Hephaestus (Deep Agent)",
      "prometheus-light": "Prometheus (Plan Builder)",
      "atlas-light": "Atlas (Plan Executor)",
      "sisyphus-light-junior": "Sisyphus-Junior",
      "metis-light": "Metis (Plan Consultant)",
      "momus-light": "Momus (Plan Critic)",
      "oracle-light": "oracle-light",
      "librarian-light": "librarian-light",
      "explore-light": "explore-light",
      "multimodal-looker-light": "multimodal-looker-light",
    }

    // when checking the constant
    // then contains all expected mappings
    expect(AGENT_DISPLAY_NAMES).toEqual(expectedMappings)
  })
})