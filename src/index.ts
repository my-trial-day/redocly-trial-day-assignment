import dotenv from 'dotenv';
import Shid from 'short-unique-id';

import { authenticate, forkRepository, openPullRequest } from './bitbucket';
import { clone, commitAndPush } from './git';
import { processPackageJson, updateDependency } from './package';

dotenv.config();

(async () => {
  try {
    const idgen = new Shid();
    // random name for the new fork
    const uid = idgen();

    console.log('Authenticating...');

    const bitbucketClient = await authenticate({
      username: process.env.BITBUCKET_USERNAME as string,
      password: process.env.BITBUCKET_PASSWORD as string,
    });

    console.log(`Creating a fork named ${uid}...`);

    const forkData: any = await forkRepository({
      repoWorkspace: process.env.TARGET_REPO_WORKSPACE as string,
      repoSlug: process.env.TARGET_REPO_SLUG as string,
      client: bitbucketClient,
      uid,
    });

    console.log(`Cloning ${forkData.data.full_name}...`);

    const clonedPath = (await clone({
      repository: `git@bitbucket.org:${forkData.data.workspace.slug}/${forkData.data.slug}.git`,
      tempDir: '/tmp',
      uid,
    })) as string;

    console.log(`Processing package.json...`);

    await processPackageJson({
      repositoryPath: clonedPath,
      fn: updateDependency({
        dependencyName: process.env.PACKAGE_NAME as string,
        dependencyVersion: process.env.PACKAGE_VERSION as string,
      }),
    });

    console.log('Committing and pushing...');

    await commitAndPush({
      repositoryPath: clonedPath,
      dependencyName: process.env.PACKAGE_NAME as string,
      dependencyVersion: process.env.PACKAGE_VERSION as string,
    });

    const pr = await openPullRequest({
      repoWorkspace: process.env.TARGET_REPO_WORKSPACE as string,
      repoSlug: process.env.TARGET_REPO_SLUG as string,
      client: bitbucketClient,
      dependencyName: process.env.PACKAGE_NAME as string,
      dependencyVersion: process.env.PACKAGE_VERSION as string,
      uid,
    });

    console.log(pr);

    console.log(clonedPath);
  } catch (error) {
    // TODO: Better error handling
    console.error(error);
  }
})();
