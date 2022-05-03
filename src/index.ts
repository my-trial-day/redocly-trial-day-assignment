import dotenv from 'dotenv';
import { clone } from './git';
import { processPackageJson, updateDependency } from './package';

dotenv.config();

(async () => {
  try {
    const clonedPath = (await clone({
      repository: process.env.TARGET_REPOSITORY as string,
      tempDir: '/tmp',
    })) as string;

    const packageJson = await processPackageJson({
      repositoryPath: clonedPath,
      fn: updateDependency({
        dependencyName: process.env.PACKAGE_NAME as string,
        dependencyVersion: process.env.PACKAGE_VERSION as string,
      }),
    });

    console.log(clonedPath);
  } catch (error) {
    console.error(error);
  }
})();
