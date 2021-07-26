# Mock do useSelector

Aqui vamos ver como testar componentes ligados ao `Redux`.

Em vez das techs estarem no localStorage, agora vou testar com as techs no
redux. Não é necessário ter os `stores`. Pra substituir, os testes usam mocks.
Não iremos testar se o Redux funciona no app. Usaremos um mock q traz um redux
fake. Então, não precisa se preocupar com config do redux.

`yarn add redux react-redux`

## \__tests__/components/TechList.test.js

O professor apagou os testes anteriores apenas pra didática da aula. O `diff` eu
to fazendo a partir da tela sem nada.

O teste q será feito: ver se aparecem 2 valores na lista q recebe valores pelo
useSelector.

O `jest.mock` faz com q qqr função do redux não seja do redux, e sim fictícia.
Agora, o useSelector não vem mais do redux. Mas e aí, fica sem função? Na
verdade, no teste eu já coloco a resposta do q faria a função ;)

O useSelector tem uma função como parâmetro, então o parâmetro de
`useSelector.mockImplementation` tb tem q ser uma função. Esta função é apenas
um return pronto. Assim:

```js
useSelector.mockImplementation(callback => callback({
  foobar: ['foo', 'bar']
}));
```

```diff
import React from 'react';
+import { useSelector } from 'react-redux';
-import { render, fireEvent } from '@testing-library/react';
+import { render } from '@testing-library/react';

import TechList from '~/components/TechList';

+jest.mock('react-redux');

describe('TechList component', () => {
+  it('should render tech list', () => {
+    useSelector.mockImplementation(cb => cb({
+      techs: ['Node.js', 'ReactJS']
+    }));
+
+    const { getByTestId, getByText } = render(<TechList />);
+
+    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
+    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
+  });
});
```

## src/components/TechList/index.js

```diff
-import React, { useState, useEffect } from 'react';
+import React, { useState } from 'react';
+import { useSelector } from 'react-redux';

// import { Container } from './styles';

function TechList() {
-  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState('');

+  const techs = useSelector(state => state.techs);

-  useEffect(() => {
-    const techs = localStorage.getItem('techs');
-
-    if (techs) {
-      setTechs(JSON.parse(techs));
-    }
-  }, []);

-  useEffect(() => {
-    localStorage.setItem('techs', JSON.stringify(techs));
-  }, [techs]);

  function handleAddTech() {
-    setTechs([...techs, newTech]);
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
