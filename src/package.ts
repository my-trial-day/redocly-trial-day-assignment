import jsonfile from 'jsonfile';

type PackageJson = {
  [key: string]: any;
  dependencies: {
    [key: string]: string;
  };
};

// Can be configurable if needed, hardcoded for now
const PACKAGE_JSON_FILENAME = 'package.json';
export const processPackageJson = async ({
  repositoryPath,
  fn,
}: {
  repositoryPath: string;
  fn: (packageJson: PackageJson) => PackageJson;
}) => {
  const packageJsonPath = `${repositoryPath}/${PACKAGE_JSON_FILENAME}`;
  const packageJson = (await jsonfile.readFile(packageJsonPath)) as PackageJson;
  await jsonfile.writeFile(packageJsonPath, fn(packageJson), { spaces: 2 });
};

type UpdateDependencyArgs = {
  dependencyName: string;
  dependencyVersion: string;
};
export const updateDependency =
  ({ dependencyName, dependencyVersion }: UpdateDependencyArgs) =>
  (packageJson: PackageJson) =>
    ({
      ...packageJson,
      dependencies: {
        ...packageJson.dependencies,
        [dependencyName]: dependencyVersion,
      },
    } as PackageJson);
