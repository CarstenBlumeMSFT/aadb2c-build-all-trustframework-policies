import * as core from '@actions/core'
import {ILogger, PolicyBuild} from 'aadb2c-core-modules-js'

class Settings {
  policyFolder = ''
  outputFolder = ''
  renumberSteps = false
  verbose = false
}

class CoreLogger implements ILogger {
  logDebug(message: string): void {
    core.debug(message)
  }

  logInfo(message: string): void {
    core.info(message)
  }

  logWarn(message: string): void {
    core.warning(message)
  }

  logError(message: string): void {
    core.error(message)
  }

  startGroup(title: string): void {
    core.startGroup(title)
  }

  endGroup(): void {
    core.endGroup()
  }
}

async function run(): Promise<void> {
  const settings: Settings = new Settings()

  try {
    settings.policyFolder = core.getInput('policyFolder')
    settings.outputFolder = core.getInput('outputFolder')
    settings.renumberSteps = core.getInput('renumberSteps') === 'true'
    settings.verbose = core.getInput('verbose') === 'true'

    core.info('Build all custom policies GitHub Action V0.0 started.')

    if (settings.policyFolder === '') {
      core.setFailed("The 'policyFolder' parameter is missing.")
    }

    if (settings.outputFolder === '') {
      core.setFailed("The 'outputFolder' parameter is missing.")
    }

    if (settings.verbose) {
      core.info(JSON.stringify(settings))
    }

    PolicyBuild(
      settings.policyFolder,
      settings.outputFolder,
      settings.renumberSteps,
      new CoreLogger()
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

run()
