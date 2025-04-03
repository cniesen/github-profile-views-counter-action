Developer Instructions
======================

* Clone the git repository
* Open the code in Visual Studio Code (File->Open Folder...)
* Create the following "Run and Debug" configuration (Play icon with bug).
    ```
    {
      "version": "0.2.0",
      "configurations": [
        {
          "type": "node",
          "request": "launch",
          "name": "Jest All",
          "program": "${workspaceFolder}/node_modules/.bin/jest",
          "args": ["--runInBand"],
          "console": "integratedTerminal",
          "internalConsoleOptions": "neverOpen",
          "disableOptimisticBPs": true,
          "windows": {
            "program": "${workspaceFolder}/node_modules/jest/bin/jest",
          },
          "env": {
            "GITHUB_REPOSITORY": "cniesen/github-views-counter",
            "INSIGHTS_TOKEN": "ghp_ABC123XXX"
          }
        }
      ]
    }
    ```
    The GITHUB_REPOSITORY environment variable needs to be set to your github repository that contains the profile view counts.  The INSIGHTS_TOKEN environment variable needs to be set to your personal access token.
* Update the `repository` list in the `/config.json` filenp to point to one or more of your git repositories.
* Run or debug `Jest All` configuration from the "Run and Debug" sidebar (Play icon with bug).

  This will run the lint task which checks for code problems, the prepare task which builds the code in the `/dist` directory (yes, don't manually change the code there as it's the wrong place), and runs the test which runs the profile view counts on your specified repositories (yes, it's not really unit/integration tests as there are no asserts).

  The test npm task will create the `/cache`, `/graph`, `/readme`, and `/svg` directories and update the `/README.md` file.  These directories and the file update should not be committed.