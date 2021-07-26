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
    "resetMocks": false
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