const {
  describe: bunDescribe,
  test: bunTest,
  expect: bunExpect,
  mock: bunMock,
} = require("bun:test")

bunDescribe("sendSyncPrompt", () => {
  bunTest("passes question=false via tools parameter", async () => {
    //#given
    const { sendSyncPrompt } = require("./sync-prompt-sender")

    let promptArgs: any
    const promptAsync = bunMock(async (input: any) => {
      promptArgs = input
      return { data: {} }
    })

    const mockClient = {
      session: {
        promptAsync,
      },
    }

    const input = {
      sessionID: "test-session",
      agentToUse: "sisyphus-light-junior",
      args: {
        description: "test task",
        prompt: "test prompt",
        run_in_background: false,
        load_skills: [],
      },
      systemContent: undefined,
      categoryModel: undefined,
      toastManager: null,
      taskId: undefined,
    }

    //#when
    await sendSyncPrompt(mockClient, input)

    //#then
    bunExpect(promptAsync).toHaveBeenCalled()
    bunExpect(promptArgs.body.tools.question).toBe(false)
  })

  bunTest("applies agent tool restrictions for explore-light agent", async () => {
    //#given
    const { sendSyncPrompt } = require("./sync-prompt-sender")

    let promptArgs: any
    const promptAsync = bunMock(async (input: any) => {
      promptArgs = input
      return { data: {} }
    })

    const mockClient = {
      session: {
        promptAsync,
      },
    }

    const input = {
      sessionID: "test-session",
      agentToUse: "explore-light",
      args: {
        description: "test task",
        prompt: "test prompt",
        category: "quick",
        run_in_background: false,
        load_skills: [],
      },
      systemContent: undefined,
      categoryModel: undefined,
      toastManager: null,
      taskId: undefined,
    }

    //#when
    await sendSyncPrompt(mockClient, input)

    //#then
    bunExpect(promptAsync).toHaveBeenCalled()
    bunExpect(promptArgs.body.tools.call_omo_agent).toBe(false)
  })

  bunTest("applies agent tool restrictions for librarian-light agent", async () => {
    //#given
    const { sendSyncPrompt } = require("./sync-prompt-sender")

    let promptArgs: any
    const promptAsync = bunMock(async (input: any) => {
      promptArgs = input
      return { data: {} }
    })

    const mockClient = {
      session: {
        promptAsync,
      },
    }

    const input = {
      sessionID: "test-session",
      agentToUse: "librarian-light",
      args: {
        description: "test task",
        prompt: "test prompt",
        category: "quick",
        run_in_background: false,
        load_skills: [],
      },
      systemContent: undefined,
      categoryModel: undefined,
      toastManager: null,
      taskId: undefined,
    }

    //#when
    await sendSyncPrompt(mockClient, input)

    //#then
    bunExpect(promptAsync).toHaveBeenCalled()
    bunExpect(promptArgs.body.tools.call_omo_agent).toBe(false)
  })

  bunTest("does not restrict call_omo_agent for sisyphus-light agent", async () => {
    //#given
    const { sendSyncPrompt } = require("./sync-prompt-sender")

    let promptArgs: any
    const promptAsync = bunMock(async (input: any) => {
      promptArgs = input
      return { data: {} }
    })

    const mockClient = {
      session: {
        promptAsync,
      },
    }

    const input = {
      sessionID: "test-session",
      agentToUse: "sisyphus-light",
      args: {
        description: "test task",
        prompt: "test prompt",
        category: "quick",
        run_in_background: false,
        load_skills: [],
      },
      systemContent: undefined,
      categoryModel: undefined,
      toastManager: null,
      taskId: undefined,
    }

    //#when
    await sendSyncPrompt(mockClient, input)

    //#then
    bunExpect(promptAsync).toHaveBeenCalled()
    bunExpect(promptArgs.body.tools.call_omo_agent).toBe(true)
  })

  bunTest("retries with promptSync for oracle-light when promptAsync fails with unexpected EOF", async () => {
    //#given
    const { sendSyncPrompt } = require("./sync-prompt-sender")

    const promptWithModelSuggestionRetry = bunMock(async () => {
      throw new Error("JSON Parse error: Unexpected EOF")
    })
    const promptSyncWithModelSuggestionRetry = bunMock(async () => {})

    const input = {
      sessionID: "test-session",
      agentToUse: "oracle-light",
      args: {
        description: "test task",
        prompt: "test prompt",
        run_in_background: false,
        load_skills: [],
      },
      systemContent: undefined,
      categoryModel: undefined,
      toastManager: null,
      taskId: undefined,
    }

    //#when
    const result = await sendSyncPrompt(
      { session: { promptAsync: bunMock(async () => ({ data: {} })) } },
      input,
      {
        promptWithModelSuggestionRetry,
        promptSyncWithModelSuggestionRetry,
      },
    )

    //#then
    bunExpect(result).toBeNull()
    bunExpect(promptWithModelSuggestionRetry).toHaveBeenCalledTimes(1)
    bunExpect(promptSyncWithModelSuggestionRetry).toHaveBeenCalledTimes(1)
  })

  bunTest("does not retry with promptSync for non-oracle-light on unexpected EOF", async () => {
    //#given
    const { sendSyncPrompt } = require("./sync-prompt-sender")

    const promptWithModelSuggestionRetry = bunMock(async () => {
      throw new Error("JSON Parse error: Unexpected EOF")
    })
    const promptSyncWithModelSuggestionRetry = bunMock(async () => {})

    const input = {
      sessionID: "test-session",
      agentToUse: "metis-light",
      args: {
        description: "test task",
        prompt: "test prompt",
        run_in_background: false,
        load_skills: [],
      },
      systemContent: undefined,
      categoryModel: undefined,
      toastManager: null,
      taskId: undefined,
    }

    //#when
    const result = await sendSyncPrompt(
      { session: { promptAsync: bunMock(async () => ({ data: {} })) } },
      input,
      {
        promptWithModelSuggestionRetry,
        promptSyncWithModelSuggestionRetry,
      },
    )

    //#then
    bunExpect(result).toContain("JSON Parse error: Unexpected EOF")
    bunExpect(promptWithModelSuggestionRetry).toHaveBeenCalledTimes(1)
    bunExpect(promptSyncWithModelSuggestionRetry).toHaveBeenCalledTimes(0)
  })
})
