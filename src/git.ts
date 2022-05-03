import simpleGit from 'simple-git';

export const clone = async ({
  repository,
  tempDir,
  uid,
}: {
  repository: string;
  tempDir: string;
  uid: string;
}) => {
  const localPath = `${tempDir}/${uid}`;
  const git = simpleGit(tempDir);

  await git.clone(repository, localPath);

  return localPath;
};

export const commitAndPush = async ({
  repositoryPath,
  dependencyName,
  dependencyVersion,
}: {
  repositoryPath: string;
  dependencyName: string;
  dependencyVersion: string;
}) => {
  const git = simpleGit(repositoryPath);

  await git.add('./*');
  await git.commit(`Upgrade ${dependencyName} to ${dependencyVersion}`);
  await git.push('origin', 'master');
};
