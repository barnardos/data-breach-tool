module.exports = config =>
  require("react-app-rewire-postcss")(config, {
    plugins: () => [
      require("postcss-import"),
      require("postcss-preset-env")({
        features: {
          "nesting-rules": true,
          "color-mod": {
            unresolved: "warn"
          },
          "custom-properties": {
            preserve: false,
            warnings: true
          }
        }
      })
    ]
  });
