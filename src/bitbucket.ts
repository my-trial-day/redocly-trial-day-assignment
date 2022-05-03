import { Bitbucket } from 'bitbucket';

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

export const openPullRequest = async ({}) => {};
