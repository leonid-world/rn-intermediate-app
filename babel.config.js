module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-transform-template-literals", // 👈 이 줄 추가
      "react-native-reanimated/plugin", // 이거 항상 마지막
    ],
  };
};
