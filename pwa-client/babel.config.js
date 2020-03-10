module.exports = api => {
  api.cache(true);

  return {
    presets: [
      "@babel/env",
      "@babel/preset-typescript",
      "@babel/react"
    ],
    plugins: [
      "@babel/proposal-class-properties",
      "@babel/proposal-object-rest-spread"
    ]
  };
};
