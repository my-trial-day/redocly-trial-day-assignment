import { APIClient, Bitbucket } from 'bitbucket';

export const authenticate = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) =>
  new Bitbucket({
    auth: {
      username,
      password,
    },
  });

export const forkRepository = async ({
  repoWorkspace,
  repoSlug,
  client,
  uid,
}: {
  repoWorkspace: string;
  repoSlug: string;
  client: APIClient;
  uid: string;
}) => {
  const fork = await client.repositories.createFork({
    workspace: repoWorkspace,
    repo_slug: repoSlug,
    // @ts-ignore
    _body: {
      name: uid,
    },
  });

  return fork;
};

export const openPullRequest = async ({
  repoWorkspace,
  repoSlug,
  client,
  uid,
  dependencyName,
  dependencyVersion,
}: {
  repoWorkspace: string;
  repoSlug: string;
  client: APIClient;
  uid: string;
  dependencyName: string;
  dependencyVersion: string;
}) => {
  const pullRequest = await client.pullrequests.create({
    workspace: repoWorkspace,
    repo_slug: repoSlug,
    // @ts-ignore
    _body: {
      title: `Upgrade ${dependencyName} to ${dependencyVersion}`,
      source: {
        repository: {
          workspace: repoWorkspace,
          repo_slug: uid,
          type: 'REPOSITORY',
        },
        branch: {
          name: 'master',
        },
      },
      destination: {
        repository: {
          workspace: repoWorkspace,
          repo_slug: repoSlug,
          type: 'REPOSITORY',
        },
        branch: {
          name: 'master',
        },
      },
    },
  });

  return pullRequest;
};
