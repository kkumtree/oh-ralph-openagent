import { describe, expect, test } from "bun:test"

import { generateModelConfig } from "./model-fallback"
import type { InstallConfig } from "./types"

function createConfig(overrides: Partial<InstallConfig> = {}): InstallConfig {
  return {
    hasClaude: false,
    isMax20: false,
    hasOpenAI: false,
    hasGemini: false,
    hasCopilot: false,
    hasOpencodeZen: false,
    hasZaiCodingPlan: false,
    hasKimiForCoding: false,
    ...overrides,
  }
}

describe("generateModelConfig", () => {
  describe("no providers available", () => {
    test("returns ULTIMATE_FALLBACK for all agents and categories when no providers", () => {
      // #given no providers are available
      const config = createConfig()

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use ULTIMATE_FALLBACK for everything
      expect(result).toMatchSnapshot()
    })
  })

  describe("single native provider", () => {
    test("uses Claude models when only Claude is available", () => {
      // #given only Claude is available
      const config = createConfig({ hasClaude: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use Claude models per NATIVE_FALLBACK_CHAINS
      expect(result).toMatchSnapshot()
    })

    test("uses Claude models with isMax20 flag", () => {
      // #given Claude is available with Max 20 plan
      const config = createConfig({ hasClaude: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models for Sisyphus
      expect(result).toMatchSnapshot()
    })

    test("uses OpenAI models when only OpenAI is available", () => {
      // #given only OpenAI is available
      const config = createConfig({ hasOpenAI: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use OpenAI models
      expect(result).toMatchSnapshot()
    })

    test("uses OpenAI models with isMax20 flag", () => {
      // #given OpenAI is available with Max 20 plan
      const config = createConfig({ hasOpenAI: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models
      expect(result).toMatchSnapshot()
    })

    test("uses Gemini models when only Gemini is available", () => {
      // #given only Gemini is available
      const config = createConfig({ hasGemini: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use Gemini models
      expect(result).toMatchSnapshot()
    })

    test("uses Gemini models with isMax20 flag", () => {
      // #given Gemini is available with Max 20 plan
      const config = createConfig({ hasGemini: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models
      expect(result).toMatchSnapshot()
    })
  })

  describe("all native providers", () => {
    test("uses preferred models from fallback chains when all natives available", () => {
      // #given all native providers are available
      const config = createConfig({
        hasClaude: true,
        hasOpenAI: true,
        hasGemini: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use first provider in each fallback chain
      expect(result).toMatchSnapshot()
    })

    test("uses preferred models with isMax20 flag when all natives available", () => {
      // #given all native providers are available with Max 20 plan
      const config = createConfig({
        hasClaude: true,
        hasOpenAI: true,
        hasGemini: true,
        isMax20: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models
      expect(result).toMatchSnapshot()
    })
  })

  describe("fallback providers", () => {
    test("uses OpenCode Zen models when only OpenCode Zen is available", () => {
      // #given only OpenCode Zen is available
      const config = createConfig({ hasOpencodeZen: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use OPENCODE_ZEN_MODELS
      expect(result).toMatchSnapshot()
    })

    test("uses OpenCode Zen models with isMax20 flag", () => {
      // #given OpenCode Zen is available with Max 20 plan
      const config = createConfig({ hasOpencodeZen: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models
      expect(result).toMatchSnapshot()
    })

    test("uses GitHub Copilot models when only Copilot is available", () => {
      // #given only GitHub Copilot is available
      const config = createConfig({ hasCopilot: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use GITHUB_COPILOT_MODELS
      expect(result).toMatchSnapshot()
    })

    test("uses GitHub Copilot models with isMax20 flag", () => {
      // #given GitHub Copilot is available with Max 20 plan
      const config = createConfig({ hasCopilot: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models
      expect(result).toMatchSnapshot()
    })

    test("uses ZAI model for librarian-light when only ZAI is available", () => {
      // #given only ZAI is available
      const config = createConfig({ hasZaiCodingPlan: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use ZAI_MODEL for librarian-light
      expect(result).toMatchSnapshot()
    })

    test("uses ZAI model for librarian-light with isMax20 flag", () => {
      // #given ZAI is available with Max 20 plan
      const config = createConfig({ hasZaiCodingPlan: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use ZAI_MODEL for librarian-light
      expect(result).toMatchSnapshot()
    })
  })

  describe("mixed provider scenarios", () => {
    test("uses Claude + OpenCode Zen combination", () => {
      // #given Claude and OpenCode Zen are available
      const config = createConfig({
        hasClaude: true,
        hasOpencodeZen: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should prefer Claude (native) over OpenCode Zen
      expect(result).toMatchSnapshot()
    })

    test("uses OpenAI + Copilot combination", () => {
      // #given OpenAI and Copilot are available
      const config = createConfig({
        hasOpenAI: true,
        hasCopilot: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should prefer OpenAI (native) over Copilot
      expect(result).toMatchSnapshot()
    })

    test("uses Claude + ZAI combination (librarian-light uses ZAI)", () => {
      // #given Claude and ZAI are available
      const config = createConfig({
        hasClaude: true,
        hasZaiCodingPlan: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then librarian-light should use ZAI, others use Claude
      expect(result).toMatchSnapshot()
    })

    test("uses Gemini + Claude combination (explore-light uses Gemini)", () => {
      // #given Gemini and Claude are available
      const config = createConfig({
        hasGemini: true,
        hasClaude: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore-light should use Gemini flash
      expect(result).toMatchSnapshot()
    })

    test("uses all fallback providers together", () => {
      // #given all fallback providers are available
      const config = createConfig({
        hasOpencodeZen: true,
        hasCopilot: true,
        hasZaiCodingPlan: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should prefer OpenCode Zen, but librarian-light uses ZAI
      expect(result).toMatchSnapshot()
    })

    test("uses all providers together", () => {
      // #given all providers are available
      const config = createConfig({
        hasClaude: true,
        hasOpenAI: true,
        hasGemini: true,
        hasOpencodeZen: true,
        hasCopilot: true,
        hasZaiCodingPlan: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should prefer native providers, librarian-light uses ZAI
      expect(result).toMatchSnapshot()
    })

    test("uses all providers with isMax20 flag", () => {
      // #given all providers are available with Max 20 plan
      const config = createConfig({
        hasClaude: true,
        hasOpenAI: true,
        hasGemini: true,
        hasOpencodeZen: true,
        hasCopilot: true,
        hasZaiCodingPlan: true,
        isMax20: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models
      expect(result).toMatchSnapshot()
    })
  })

  describe("explore-light agent special cases", () => {
    test("explore-light uses gpt-5-nano when only Gemini available (no Claude)", () => {
      // #given only Gemini is available (no Claude)
      const config = createConfig({ hasGemini: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore-light should use gpt-5-nano (Claude haiku not available)
      expect(result.agents?.explore-light?.model).toBe("opencode/gpt-5-nano")
    })

    test("explore-light uses Claude haiku when Claude available", () => {
      // #given Claude is available
      const config = createConfig({ hasClaude: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore-light should use claude-haiku-4-5
      expect(result.agents?.explore-light?.model).toBe("anthropic/claude-haiku-4-5")
    })

    test("explore-light uses Claude haiku regardless of isMax20 flag", () => {
      // #given Claude is available without Max 20 plan
      const config = createConfig({ hasClaude: true, isMax20: false })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore-light should use claude-haiku-4-5 (isMax20 doesn't affect explore-light)
      expect(result.agents?.explore-light?.model).toBe("anthropic/claude-haiku-4-5")
    })

    test("explore-light uses OpenAI model when only OpenAI available", () => {
      // #given only OpenAI is available
      const config = createConfig({ hasOpenAI: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore-light should use native OpenAI model
      expect(result.agents?.explore-light?.model).toBe("openai/gpt-5.4")
      expect(result.agents?.explore-light?.variant).toBe("medium")
    })

    test("explore-light uses gpt-5-mini when only Copilot available", () => {
      // #given only Copilot is available
      const config = createConfig({ hasCopilot: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore-light should use gpt-5-mini (Copilot fallback)
      expect(result.agents?.explore-light?.model).toBe("github-copilot/gpt-5-mini")
    })
  })

  describe("Sisyphus agent special cases", () => {
    test("Sisyphus is created when at least one fallback provider is available (Claude)", () => {
      // #given
      const config = createConfig({ hasClaude: true, isMax20: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.sisyphus-light?.model).toBe("anthropic/claude-opus-4-6")
    })

    test("Sisyphus is created when multiple fallback providers are available", () => {
      // #given
      const config = createConfig({
        hasClaude: true,
        hasKimiForCoding: true,
        hasOpencodeZen: true,
        hasZaiCodingPlan: true,
        isMax20: true,
      })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.sisyphus-light?.model).toBe("anthropic/claude-opus-4-6")
    })

    test("Sisyphus resolves to gpt-5.4 medium when only OpenAI is available", () => {
      // #given
      const config = createConfig({ hasOpenAI: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.sisyphus-light?.model).toBe("openai/gpt-5.4")
      expect(result.agents?.sisyphus-light?.variant).toBe("medium")
    })
  })

  describe("Hephaestus agent special cases", () => {
    test("Hephaestus is created when OpenAI is available (openai provider connected)", () => {
      // #given
      const config = createConfig({ hasOpenAI: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.hephaestus-light?.model).toBe("openai/gpt-5.3-codex")
      expect(result.agents?.hephaestus-light?.variant).toBe("medium")
    })

    test("Hephaestus is NOT created when only Copilot is available (gpt-5.3-codex unavailable on github-copilot)", () => {
      // #given
      const config = createConfig({ hasCopilot: true })

      // #when
      const result = generateModelConfig(config)

      // #then - hephaestus-light is omitted because gpt-5.3-codex is not available on github-copilot
      expect(result.agents?.hephaestus-light).toBeUndefined()
    })

    test("Hephaestus is created when OpenCode Zen is available (opencode provider connected)", () => {
      // #given
      const config = createConfig({ hasOpencodeZen: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.hephaestus-light?.model).toBe("opencode/gpt-5.3-codex")
      expect(result.agents?.hephaestus-light?.variant).toBe("medium")
    })

    test("Hephaestus is omitted when only Claude is available (no required provider connected)", () => {
      // #given
      const config = createConfig({ hasClaude: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.hephaestus-light).toBeUndefined()
    })

    test("Hephaestus is omitted when only Gemini is available (no required provider connected)", () => {
      // #given
      const config = createConfig({ hasGemini: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.hephaestus-light).toBeUndefined()
    })

    test("Hephaestus is omitted when only ZAI is available (no required provider connected)", () => {
      // #given
      const config = createConfig({ hasZaiCodingPlan: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.hephaestus-light).toBeUndefined()
    })
  })

  describe("librarian-light agent special cases", () => {
    test("librarian-light uses ZAI model when ZAI is available regardless of other providers", () => {
      // #given ZAI and Claude are available
      const config = createConfig({
        hasClaude: true,
        hasZaiCodingPlan: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then librarian-light should use ZAI_MODEL
      expect(result.agents?.librarian-light?.model).toBe("zai-coding-plan/glm-4.7")
    })

    test("librarian-light falls back to generic chain result when no librarian-light provider matches", () => {
      // #given only Claude is available (no ZAI)
      const config = createConfig({ hasClaude: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then librarian-light should use generic chain result when chain providers are unavailable
      expect(result.agents?.librarian-light?.model).toBe("anthropic/claude-sonnet-4-5")
    })
  })

  describe("schema URL", () => {
    test("always includes correct schema URL", () => {
      // #given any config
      const config = createConfig()

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should include correct schema URL
      expect(result.$schema).toBe(
        "https://raw.githubusercontent.com/code-yeongyu/oh-my-openagent/dev/assets/oh-my-opencode.schema.json"
      )
    })
  })
})
