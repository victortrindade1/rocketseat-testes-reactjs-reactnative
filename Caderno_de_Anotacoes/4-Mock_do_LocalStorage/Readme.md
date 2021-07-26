# Mock do LocalStorage

Não é a nossa responsabilidade testar APIs externas. O localstorage, por
exemplo, é uma API do browser. Eu não preciso garantir q essa API esteja
disponível. Ou seja:
  
  > Os testes não podem atingir APIs externas.

Sempre q fizermos testes com APIs externas, vamos trabalhar com `Mocks`. Algumas
APIs mais famosas fornecem um Mock, mas podemos também criar Mocks do zero. O Mock simula a API, sem q precisemos fazer uma request verdadeira pro servidor da API. Assim, testes não sobrecarregam servidores ;)

Neste exemplo, vou usar um Mock pronto pra localstorage.

## \__tests__/components/TechList.test.js

O teste será ver se funciona localstorage. O usuário insere um valor no input e submita. O localstorage salva o valor. A tela zera. Verifica se o valor está na lista.

O `beforeEach` roda entre testes.

```diff
import React from 'react';
-import { render, fireEvent } from '@testing-library/react';
+import { render, fireEvent, cleanup } from '@testing-library/react';

import TechList from '~/components/TechList';
 
describe('TechList component', () => {
+  beforeEach(() => {
+    localStorage.clear();
+  });

  it('should be able to add new tech', () => {
    const { getByText, getByTestId, getByLabelText } = render(<TechList />);

    fireEvent.change(getByLabelText('Technologies'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));
    
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Technologies')).toHaveValue('');
  });

+  it('should store techs in storage', () => {
+    /**
+     * Aqui é let pq vai renderizar 2 vezes no mesmo teste, Daí deixa de ser 
+     * const
+     */
+    let { getByText, getByTestId, getByLabelText, debug } = render(<TechList />);
+
+    fireEvent.change(getByLabelText('Technologies'), { target: { value: 'Node.js' } });
+    fireEvent.submit(getByTestId('tech-form'));
+
+    cleanup();
+
+    /**
+     * Usar entre parênteses é uma forma de continuar usando a desestruturação
+     * redefinindo as variáveis
+     */
+    ({ getByText, getByTestId, getByLabelText } = render(<TechList />));
+
+    /**
+     * O expect(localStorage.setItem) testa se a função setItem do localStorage
+     * foi chamada. Este tipo de teste, somente dá pra testar se for em um Mock.
+     */
+    expect(localStorage.setItem).toHaveBeenCalledWith('techs', JSON.stringify(['Node.js']));
+    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
+  });
})
```

## src/components/TechList/index.js

```diff
-import React, { useState } from 'react';
+import React, { useState, useEffect } from 'react';

// import { Container } from './styles';

function TechList() {
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState('');

+  useEffect(() => {
+    const techs = localStorage.getItem('techs');
+
+    if (techs) {
+      setTechs(JSON.parse(techs));
+    }
+  }, []);

+  useEffect(() => {
+    localStorage.setItem('techs', JSON.stringify(techs));
+  }, [techs]);

  function handleAddTech() {
    setTechs([...techs, newTech]);
    setNewTech('');
  }

  return (
    <form data-testid="tech-form" onSubmit={handleAddTech}>
      <ul data-testid="tech-list">
        {techs.map(tech => <li key={tech}>{tech}</li>)}
      </ul>

      <label htmlFor="tech">Technologies</label>
      <input id="tech" 
        value={newTech} 
        onChange={e => setNewTech(e.target.value)} 
      />
      <button onClick={handleAddTech}>Adicionar</button>
    </form>
  );
}

export default TechList;
```

## package.json

O `localstorage` possui um Mock pronto, o `jest-localstorage-mock`. Ele sobrepõe o localStorage do browser. Sua config é bem simples, apenas no package.json. Instale:

`yarn add jest-localstorage-mock -D`

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
      "@testing-library/jest-dom/extend-expect"
+      "jest-localstorage-mock"
    ],
+   "resetMocks": false
    "moduleNameMapper": {
      "^~/(.*)": "<rootDir>/src/$1"
    }
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
    "react-app-rewired": "^2.1.8"
  }
}
```
