# github-profile-views-counter-action
GitHub Action for setting up insights of your repositories on your workflow without using any third-party apps.


## Watch this video
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/K6FYiP_XRuU/0.jpg)](https://www.youtube.com/watch?v=K6FYiP_XRuU)



# The https://github.com/cniesen/github-profile-views-counter-action fork
This fork contains bug fixes and new feature for the Github action.  To use these modifications update the `.github/workflows/action.yml` file to point to the forked action.  Example:
```
- uses: cniesen/github-profile-views-counter-action@2.0.0
```

## Bugfixes
- Fixed year graph ([version 1.1.0](https://github.com/cniesen/github-profile-views-counter-action/releases/tag/1.1.0))

## Added support for organizational repositories
Repos from organizations which you are a member of can be specified by adding the repository with the organization prefix in the `config.json` file.  Example:
```
  "repository": [
    "morsetrainer",
    "cqqrz/cqqrz.github.io"
  ]
```
([version 2.0.0](https://github.com/cniesen/github-profile-views-counter-action/releases/tag/1.1.0))
