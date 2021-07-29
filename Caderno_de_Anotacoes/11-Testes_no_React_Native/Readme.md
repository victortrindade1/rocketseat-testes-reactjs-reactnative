# Testes no React Native

É exatamente igual o React, quase nada muda.

Instale essas 2 libs:
`yarn add @testing-library/react-native -D`
`yarn add @testing-library/jest-native -D`

Aqui eu criei um projeto de react-native dentro do projeto do react. Está na
pasta `testes_react_native`.

## testes_react_native/package.json

```diff
{
  "name": "testes_react_native",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "17.0.1",
    "react-native": "0.64.2"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9",
    "@babel/runtime": "^7.12.5",
    "@react-native-community/eslint-config": "^2.0.0",
    "babel-jest": "^26.6.3",
    "eslint": "7.14.0",
    "jest": "^26.6.3",
    "metro-react-native-babel-preset": "^0.64.0",
    "react-test-renderer": "17.0.1"
  },
  "jest": {
    "preset": "react-native",
+    "setupFilesAfterEnv": [
+      "@testing-library/jest-native/extend-expect"
+    ],
+    "testMatch": [
+      "**/__tests__/**/*.test.js"
+    ],
+    "coveragePathIgnorePatterns": [
+      "src/services/api.js"
+    ],
+    "coverageDirectory": "__tests__/coverage",
+    "moduleNameMapper": {
+      "^~/(.*)": "<rootDir>/src/$1"
+    }
  }
}
```

## testes_react_native/jsconfig.json

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

## testes_react_native/src/components/TechList.js

```js
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";

// import { Container } from './styles';

function TechList() {
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState("");

  function handleAdd() {
    setTechs([...techs, newTech]);
    setNewTech("");
  }

  return (
    <View>
      <FlatList
        data={techs}
        keyExtractor={(tech) => tech}
        renderItem={({ item }) => <Text>{item}</Text>}
      />

      <TextInput
        testID="tech-input"
        value={newTech}
        onChangeText={setNewTech}
      />

      <TouchableOpacity onPress={handleAdd}>
        <Text>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TechList;
```

## testes_react_native/\_\_tests\_\_/components/TechList.test.js

```js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import TechList from "~/components/TechList";

describe("TechList", () => {
  it("should be able to add new tech", () => {
    const { getByText, getByTestId } = render(<TechList />);

    fireEvent.changeText(getByTestId("tech-input"), "Node.js");
    fireEvent.press(getByText("Adicionar"));

    expect(getByText("Node.js")).toBeTruthy();
    expect(getByTestId("tech-input")).toHaveProp("value", "");
  });
});
```
