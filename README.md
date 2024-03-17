# Create-React-App 없이 React 환경 구성하기

<br />
<br />

## 1. package.json 파일 생성

**프로젝트 폴더를 생성하고 폴더 내부에서 pnpm init 명령어로 package.json 파일을 생성합니다.**

```jsx
pnpm init
```

## 2. webpack 관련 의존성 모듈 설치하기

**웹팩과 웹팩 CLI 설치하기**

웹팩은 모듈 번들링을 위한 핵심 도구입니다.

모든 모듈(자바스크립트, CSS, 이미지 파일 등)을 하나 또는 여러 개의 파일로 번들링해 주어, 브라우저가 이해할 수 있는 형태로 만들어 줍니다.

- 웹팩
  - 모듈 번들러
  - 프로젝트의 모든 모듈을 하나의 팔일 또는 여러 파일로 번들링해주는 역할을 하게 된다.
- 웹팩 CLI
  - 웹팩을 커맨드 라인에서 실행할 수 있게 해주는 도구
- webpack-dev-server
  - 개발을 위한 간단한 webpack이 제공하는 웹 서버입니다.

```jsx
$ pnpm add webpack webpack-cli webpack-dev-server -D
```

## 3. React와 ReactDOM 설치하기

React 개발 시 핵심 라이브러리인 React와 ReactDOM을 설치합니다.

- ReactDOM은 리액트 컴포넌트를 실제 DOM에 렌더링하는 사용됩니다.
- 해당 패키지들은 실제 프로덕션환경에서 애플리케이션을 실행하는데 필수적으로 필요하므로 **dependencies로 설치합니다.**

```jsx
$ pnpm add react react-dom
```

## 4. Babel 설치 및 설정하기

Babel은 최신 자바스크립트를 이전 버전의 자바스크립트와의 하위호환성을 위해 이전 버전의 자바스크립트 코드로 변환해주는 트랜스파일러

- 리액트에선 추가적으로 JSX 문법을 변환하기 위해서도 사용됩니다.

바벨은 개발과정에서만 사용되므로 -D를 추가적으로 붙입니다.

- 이는 실제 프로덕션 환경에서 실행되는 코드에는 Babel이 직접적으로 포함되지 않음을 알 수 있습니다.

```jsx
$ pnpm add babel-loader @babel/core @babel/preset-env @babel/preset-react -D
```

## 5. Webpack 설정 파일 생성하기

**웹팩을 사용하기 위해 webpack.config.js 파일을 프로젝트 루트에서 생성합니다.**

- 이후 기본적인 설정을 정의하는데 관련 주석 첨부하겠습니다.

```jsx
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
```

## 6. React 시작을 위한 마지막 구성들..

1. 프로젝트 내 src라는 폴더를 생성 후 main.js 파일을 만듭니다.
2. 프로젝트 루트에 index.html 파일을 생성합니다.

### **index.html 구성**

- 여기서 추가해야할 중요한 부분은 프로젝트의 루트 노드를 담당할 root 디비전을 생성합니다.
- 웹팩 개발 서버는 `dist` 폴더의 내용을 가상으로 호스팅하기 때문에, 실제 경로 대신 웹팩이 생성한 `bundle.js`를 참조해야 합니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React</title>
    <link rel="stylesheet" href="./../style.css" />
  </head>

  <body>
    <div id="root"></div>
    <script src="/bundle.js"></script>
  </body>
</html>
```

### **package.json 명령어 수정 및 추가**

**기존 package.json의 script의 내용들을 추가적으로 구성합니다.**

- 이후 babel의 preset들 또한 package.json에 추가적으로 구성해야합니다.

```jsx
  "scripts": {
    "start": "webpack serve",
    "build": "webpack"
  },
```

**최종적으로 완성된 package.json 설정환경**

```json
{
  "name": "react-no-cra",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.24.0",
    "@babel/preset-env": "^7.24.0",
    "@babel/preset-react": "^7.23.3",
    "babel-loader": "^9.1.3",
    "webpack": "^5.90.3",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^5.0.3"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "babel": {
    "presets": ["@babel/preset-env", "@babel/preset-react"]
  }
}
```

### main.js/App.js 구성하기

**src 폴더 내부 main.js와 App.js를 설정합니다.**

- 과거 main.js에서는 렌더링방식을 ReactDOM.render로 정의했으나 18버전이후, 리액트는 createRoot로 루트를 만들고 루트에서 렌더하는 방식으로 방법이 변경되었습니다.
  - 관련 문서 : https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis

```jsx
import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
```

**App.js**

```
import React from "react";

function App() {
  return (
    <>
      <div>App</div>
    </>
  );
}

export default App;

```
