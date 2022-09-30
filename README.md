# GitHub Action to build all Azure AD B2C custom policies

Use this GitHub Action to build a set of [Azure AD B2C custom policies](https://docs.microsoft.com/azure/active-directory-b2c/custom-policy-overview) by replacing the settings supplied in an appsettings.json file. This action is implemented to provide the same functionality as the "B2C Build all policies" command of the [Azure AD B2C VS code extension](https://github.com/azure-ad-b2c/vscode-extension#policy-settings).

## Sample workflow to build all policies

```yaml
on: push

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: 'Build all policies'
      uses: CarstenBlumeMSFT/aadb2c-build-all-trustframework-policies@v0.0.1
      with:
        policyFolder: ./MyPolicyFolder
        outputFolder: ./generatedOutput
        renumberSteps: true
        verbose: true
```

## Parameters for the GitHub Action
| Parameter | Description |
| :-------- | :---------- |
| policyFolder | The input folder for building the policies. The appsettings.json file is expected to be found in this folder. The action will find all XML-files in the folder and its subfolders, whilst automatically ignoring all files in the directory set as "EnvironmentsFolder" in the appsettings.json. |
| outputFolder | The output folder where the processed polcy-files are written. Like when processing through the [Azure AD B2C VS code extension](https://github.com/azure-ad-b2c/vscode-extension#policy-settings) a seperate folder is created for each environment. |
| renumberSteps *(optional)* | true / false - Indicates if steps inside UserJourneys should be renumbered if they're out of sync. *(default: false)* |
| verbose *(optional)* | true / false - Indicates if the logging outbut should be verbose. *(default: false)* |
