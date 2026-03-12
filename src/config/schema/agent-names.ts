import { z } from "zod"

export const BuiltinAgentNameSchema = z.enum([
  "sisyphus-light",
  "hephaestus-light",
  "prometheus-light",
  "oracle-light",
  "librarian-light",
  "explore-light",
  "multimodal-looker-light",
  "metis-light",
  "momus-light",
  "atlas-light",
  "sisyphus-light-junior",
])

export const BuiltinSkillNameSchema = z.enum([
  "playwright",
  "agent-browser",
  "dev-browser",
  "frontend-ui-ux",
  "git-master",
])

export const OverridableAgentNameSchema = z.enum([
  "build",
  "plan",
  "sisyphus-light",
  "hephaestus-light",
  "sisyphus-light-junior",
  "OpenCode-Builder",
  "prometheus-light",
  "metis-light",
  "momus-light",
  "oracle-light",
  "librarian-light",
  "explore-light",
  "multimodal-looker-light",
  "atlas-light",
])

export const AgentNameSchema = BuiltinAgentNameSchema
export type AgentName = z.infer<typeof AgentNameSchema>

export type BuiltinSkillName = z.infer<typeof BuiltinSkillNameSchema>
