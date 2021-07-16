# Configurando ambiente

Em vez de usar um projeto existente, os testes serão explicados em um projeto
novo.

`yarn create react-app nome_do_app`

O CRA já vem com o Jest junto. Não daria pra fazer um jest init e criar as
configurações. Pra poder configurar o Jest q vem nativo, vou ter q usar a lib
`react-app-rewired`, e o Jest vai ser configurado dentro do package.json.

`yarn add react-app-rewired -D`

3 libs foram adicionadas pra incrementar os tests:

  -@testing-library/react: testa components react
  -@testing-library/jest-dom: testa components do DOM
  -@types/jest: ajuda na intellisense

`yarn add @testing-library/react @testing-library/jest-dom @types/jest -D`

## config-overrides.js

Este arquivo é necessário qnd instala react-app-rewired.

```js
module.exports = {};
```

## package.json

O `moduleNameMapper` serve pro Jest enxergar importações começadas com `~`.

O `extend-expect` serve pra extender as funcionalidades do Jest-DOM em todos os
testes.

```diff
{
  "name": "rocketseat-testes-reactjs-reactnative",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.0.1"
  },
  "scripts": {
-    "start": "react-scripts start",
-    "build": "react-scripts build",
-    "test": "react-scripts test",
+    "start": "react-app-rewired start",
+    "build": "react-app-rewired build",
+    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
+  "jest": {
+    "roots": [
+      "<rootDir>/__tests__/"
+    ],
+    "testMatch": [
+      "**/__tests__/**/*.test.js"
+    ],
+    "setupFilesAfterEnv": [
+      "@testing-library/react",
+      "@testing-library/jest-dom/extend-expect"
+    ],
+    "moduleNameMapper": {
+      "^~/(.*)": "<rootDir>/src/$1"
+    }
+  },
-  "eslintConfig": {
-    "extends": [
-      "react-app",
-      "react-app/jest"
-    ]
-  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
+    "@testing-library/jest-dom": "^5.9.0",
+    "@testing-library/react": "^10.2.1",
+    "@types/jest": "^26.0.24",
    "react-app-rewired": "^2.1.8"
  }
}
```

> OBS: O professor usou uma config q não existe mais:

```diff
"jest": {
  ...
  "setupFilesAfterEnv": [
-     "@testing-library/react/cleanup-after-each",
+     "@testing-library/react",
    "@testing-library/jest-dom/extend-expect"
  ],
  ...
}
```

## jsconfig.json

Este arquivo é pro vscode não se perder nas importações.

```js
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "~/*": ["*"]
    }
  }
}
```

## Testando

### __tests__/App.test.js

O `import App` é só pra testar se o `moduleNameMapper` está funcionando no
package.json.

```js
import App from "~/App";

test('example', () => {
  expect(1 + 1).toBe(2);
})
```

Rode um `yarn test` pra ver se está ok.
