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
  "$schema": "https://raw.githubusercontent.com/kkumtree/oh-ralph-openagent/ralph/assets/oh-ralph-openagent.schema.json",
  "agents": {
    "sisyphus-light": {
      "model": "github-copilot/gpt-4.1",
      "variant": "high"
    },
    "hephaestus-light": {
      "model": "github-copilot/gpt-4.1"
    },
    "oracle-light": {
      "model": "github-copilot/gpt-4.1",
      "variant": "high"
    },
    "librarian-light": {
      "model": "github-copilot/gpt-4.1"
    },
    "explore-light": {
      "model": "github-copilot/gpt-5-mini"
    },
    "multimodal-looker-light": {
      "model": "github-copilot/gpt-4.1"
    },
    "prometheus-light": {
      "model": "github-copilot/gpt-4.1",
      "variant": "max"
    },
    "metis-light": {
      "model": "github-copilot/gpt-4.1",
      "variant": "max"
    },
    "momus-light": {
      "model": "github-copilot/gpt-4.1",
      "variant": "max"
    },
    "atlas-light": {
      "model": "github-copilot/gpt-4.1"
    }
  },
  "categories": {
    "visual-engineering": {
      "model": "github-copilot/gpt-4.1",
      "variant": "high"
    },
    "ultrabrain": {
      "model": "github-copilot/gpt-4.1",
      "variant": "max"
    },
    "artistry": {
      "model": "github-copilot/gpt-4.1",
      "variant": "high"
    },
    "quick": {
      "model": "github-copilot/oswe-vscode-prime@raptor-mini"
    },
    "unspecified-low": {
      "model": "github-copilot/gpt-5-mini"
    },
    "unspecified-high": {
      "model": "github-copilot/gpt-4.1",
      "variant": "high"
    },
    "writing": {
      "model": "github-copilot/gpt-5-mini"
    }
  }
}
```
