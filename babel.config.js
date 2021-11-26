module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@contexts': './src/contexts',
            '@hooks': './src/hooks',
            '@screens': './src/screens',
            '@store': './src/store',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
