The script needs an .env file to run.

```
PACKAGE_NAME=redocly_package
PACKAGE_VERSION=0.0.1

TARGET_REPO_WORKSPACE=my-trial-day
TARGET_REPO_SLUG=test-repo
TARGET_REPOSITORY=git@bitbucket.org:${TARGET_REPO_WORKSPACE}/${TARGET_REPO_SLUG}.git

BITBUCKET_USERNAME=<bitbucket username>
BITBUCKET_PASSWORD=<bitbucket app password>
```

It does the following:

- Authenticates with bitbucket
- Forks the target repository
- Clones that fork
- Edits the package.json
- Commits the changes and pushes them
- Opens a pull request from the fork to the original repository

TODO:
Potential improvements:

- Input validation
- Better error handling
- Correct typings for the Bitbucket API (had to cut corners with @ts-ignore)
- Tests
