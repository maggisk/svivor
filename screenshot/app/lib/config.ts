import invariant from "tiny-invariant";

const getEnv = (key: string) => {
  const v = process.env[key];
  invariant(v, `missing required environment variable "${key}"`);
  return v;
};

export const githubClientId = getEnv("GITHUB_CLIENT_ID");
export const githubClientSecret = getEnv("GITHUB_CLIENT_SECRET");
export const secrets = getEnv("SECRETS").split(",");
