# Coverage report

## package.json

```diff
{
  "name": "rocketseat-testes-reactjs-reactnative",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "axios": "^0.21.1",
    "immer": "^9.0.5",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-redux": "^7.2.4",
    "react-scripts": "4.0.3",
    "redux": "^4.1.0",
    "redux-saga": "^1.1.3",
    "web-vitals": "^1.0.1"
  },
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
+    "coverage": "react-app-rewired test --coverage --watchAll=false",
    "eject": "react-scripts eject"
  },
  "jest": {
    "roots": [
      "<rootDir>/__tests__/"
    ],
    "testMatch": [
      "**/__tests__/**/*.test.js"
    ],
    "setupFilesAfterEnv": [
      "@testing-library/react",
      "@testing-library/jest-dom/extend-expect",
      "jest-localstorage-mock"
    ],
    "moduleNameMapper": {
      "^~/(.*)": "<rootDir>/src/$1"
    },
    "resetMocks": false,
+    "collectCoverage": true,
+    "coveragePathIgnorePatterns": [
+      "src/index.js",
+      "src/services/api.js"
+    ],
+    "coverageDirectory": "__tests__/coverage"
  },
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
    "@testing-library/jest-dom": "^5.9.0",
    "@testing-library/react": "^10.2.1",
    "@types/jest": "^26.0.24",
    "axios-mock-adapter": "^1.19.0",
    "jest-localstorage-mock": "^2.4.14",
    "react-app-rewired": "^2.1.8"
  }
}
```

## \__tests__/store/reducers/techs.test.js

Aqui o professor vai mexer pq qnd ele rodou o `coverage report`, o jest mostrou
que umas linhas não são lidas: o INITIAL STATE e o case default. Isto pq alguma
action vazia é disparada e o reducer cai no default. 

```diff
import reducer, { INITIAL_STATE } from '~/store/modules/techs/reducer';
import * as Techs from '~/store/modules/techs/actions';

describe('Techs reducer', () => {
+  it('DEFAULT', () => {
+    const state = reducer(undefined, {});
+
+    expect(state).toStrictEqual(INITIAL_STATE);
+  });

  it('ADD_TECH', () => {
    const state = reducer(INITIAL_STATE, Techs.addTech('Node.js'));

    expect(state).toStrictEqual(['Node.js']);
  })
});
```
