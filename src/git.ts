import simpleGit from 'simple-git';
import Shid from 'short-unique-id';

export const clone = async ({
  repository,
  tempDir,
}: {
  repository: string;
  tempDir: string;
}) => {
  const uid = new Shid();
  const localPath = `${tempDir}/${uid()}`;

  console.log(`Cloning ${repository} to ${localPath}...`);
  const git = simpleGit(tempDir);

  await git.clone(repository, localPath);

  return localPath;
};
