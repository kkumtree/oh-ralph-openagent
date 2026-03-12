# Oh Ralph OpenAgent

> Just custom plugin Setup beside OmO. 

## Installation

### For Humans

Copy and paste this prompt to your LLM agent (Claude Code, AmpCode, Cursor, etc.):

```bash
Install and configure oh-ralph-openagent by following the instructions here:
https://raw.githubusercontent.com/kkumtree/oh-ralph-openagent/refs/heads/ralph/docs/guide/installation.md
```

### For LLM Agents

Fetch the installation guide and follow it:

```bash
curl -s https://raw.githubusercontent.com/kkumtree/oh-ralph-openagent/refs/heads/ralph/docs/guide/installation.md
```

## Configuration  

json files will be expected below.

### Global

```bash
# cat ~/.config/opencode/opencode.json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "oh-my-opencode",
    "oh-ralph-openagent"	# This Line
  ]
}
```

### Plugin

```bash
# cat ~/.config/opencode/oh-ralph-openagent.json
{
  "$schema": "https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/dev/assets/oh-my-opencode.schema.json",
  "agents": {
    "sisyphus": {
      "model": "github-copilot/claude-opus-4.6",
      "variant": "max"
    },
    "hephaestus": {
      "model": "github-copilot/gpt-5.3-codex"
    },
    "oracle": {
      "model": "github-copilot/gpt-5.4",
      "variant": "high"
    },
    "librarian": {
      "model": "github-copilot/claude-sonnet-4.5"
    },
    "explore": {
      "model": "github-copilot/gpt-5-mini"
    },
    "multimodal-looker": {
      "model": "github-copilot/gemini-3-flash-preview"
    },
    "prometheus": {
      "model": "github-copilot/claude-opus-4.6",
      "variant": "max"
    },
    "metis": {
      "model": "github-copilot/claude-opus-4.6",
      "variant": "max"
    },
    "momus": {
      "model": "github-copilot/gpt-5.4",
      "variant": "xhigh"
    },
    "atlas": {
      "model": "github-copilot/claude-sonnet-4.5"
    }
  },
  "categories": {
    "visual-engineering": {
      "model": "github-copilot/gemini-3.1-pro-preview",
      "variant": "high"
    },
    "ultrabrain": {
      "model": "github-copilot/gemini-3.1-pro-preview",
      "variant": "high"
    },
    "artistry": {
      "model": "github-copilot/gemini-3.1-pro-preview",
      "variant": "high"
    },
    "quick": {
      "model": "github-copilot/claude-haiku-4.5"
    },
    "unspecified-low": {
      "model": "github-copilot/claude-sonnet-4.5"
    },
    "unspecified-high": {
      "model": "github-copilot/claude-sonnet-4.5"
    },
    "writing": {
      "model": "github-copilot/gemini-3-flash-preview"
    }
  }
}
```
