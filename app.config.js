import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
  android: {
    package: "com.anonymous.newsmobile",
  },
  ios: {
    bundleIdentifier: "com.anonymous.newsmobile",
  },
});
