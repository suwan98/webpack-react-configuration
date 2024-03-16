const path = require("path");

module.exports = {
  /* 빌드 모드 설정 : 개발 시에는 development로 설정 */
  mode: "development",

  /* 애플리케이션의 진입점입니다. 웹팩이 파일을 번들랑 하기 위해 시작하는 곳입니다. */
  entry: "./src/main.js",

  /* 번들링 된 파일의 출력을 설정 */
  output: {
    /* 번들링 될 파일이 저장될 경로 */
    path: path.resolve(__dirname, "dist"),
    /* 출력 파일 이름 */
    filename: "bundle.js",
    /* 새로운 빌드 진행 시 dist 폴더 내 이전 파일들을 제거하는 옵션입니다. */
    clean: true,
  },

  /* 모듈을 해석하는 설정 */
  resolve: {
    /* 처리할 파일의 확장자를 지정합니다 */
    extensions: [".js", ".jsx"],

    /* 파일들의 절대경로 alias를 설정합니다. */
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },

  /* 개발 서버 설정 */
  devServer: {
    /* 정적 파일(public 내부 파일)이 제공될 경로를 설정합니다. */
    static: path.resolve(__dirname, "public"),
    /* 서버가 실행될 포트. 환경변수에서 PORT를 참조하며, 설정되어 있지 않다면 8080포트를 사용합니다 */
    port: process.env.PORT || 8080,
  },

  /* 모듈 처리 규칙 정의 */
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        /* node_modules 디렉토리는 제외 */
        exclude: /node_modules/,
        /* babel-loader를 통해 JS와 JSX 파일을 트랜스파일링합니다. */
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
