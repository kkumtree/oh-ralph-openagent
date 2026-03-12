import * as z from "zod"
import { OhMyOpenCodeConfigSchema } from "../src/config/schema"

export function createOhMyOpenCodeJsonSchema(): Record<string, unknown> {
  const jsonSchema = z.toJSONSchema(OhMyOpenCodeConfigSchema, {
    target: "draft-7",
    unrepresentable: "any",
  })

  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://raw.githubusercontent.com/kkumtree/oh-ralph-openagent/ralph/assets/oh-ralph-openagent.schema.json",
    title: "Oh Ralph OpenAgent Configuration",
    description: "Configuration schema for oh-ralph-openagent plugin",
    ...jsonSchema,
  }
}
