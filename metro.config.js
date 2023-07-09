// Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('@expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts.push('cjs');

// module.exports = defaultConfig;

// const { getDefaultConfig } = require('expo/metro-config');

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig(__dirname);

//   return {
//     resolver: {
//       assetExts: [...assetExts, 'db', 'sql', 'gz'], // Додати типи файлів, які ви використовуєте в своєму проекті
//       sourceExts: [...sourceExts, 'jsx'], // Додати розширення файлів, які ви використовуєте в своєму проекті
//     },
//   };
// })();

const { getDefaultConfig } = require('@expo/metro-config');

// module.exports = getDefaultConfig(__dirname);

const updateExts = (data) => {
  data.push('cjs');
  return data.filter((ext) => ext !== 'svg');
};

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: updateExts(assetExts),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
