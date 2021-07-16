# Primeiro teste

A partir do momento q vc está com `yarn test` rodando, toda vez q vc salva o
código, ele refaz o teste automaticamente. Assim, vc consegue ir vendo o q falta
pro teste passar.

No teste abaixo, quero q ao clicar no botão Adicionar, uma lista contenha a
palavra 'Node.js'.

## __tests__/components/TechList.test.js

O `render` é o responsável por renderizar na DOM virtual, é como um HTML fake.
Dele, pegaremos o `getByText` e o `getByTestId`.

Com o `getByText` o teste pode achar pelo texto escrito na DOM.

O `getByTestId` é usado qnd fica muito difícil dizer pro teste qual é o
elemento q vc quer. No caso do exemplo, eu vou querer um ítem `<li>` na lista
`<ul>`. Ficará algo assim: `<ul data-testid="tech-list"></ul>`, e no test chama
assim: `getByTestId('tech-list')`.

O `fireEvent` é muito fácil de usar. Captura todo tipo de evento na DOM, como
focus, click, mouse over...

O `debug` é bem legal. Ele mostra na tela o html no momento do debug. é um jeito
de conseguir enxergar a DOM.

```js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TechList from '~/components/TechList';
 
describe('TechList component', () => {
  it('should be able to add new tech', () => {
    const { getByText, getByTestId, debug } = render(<TechList />);

    debug();

    fireEvent.click(getByText('Adicionar'));

    debug();
    
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  })
})
```

## src/components/TechList/index.js

```js
import React, { useState } from 'react';

// import { Container } from './styles';

function TechList() {
  const [techs, setTechs] = useState([]);

  function handleAddTech() {
    setTechs([...techs, 'Node.js']);
  }

  return (
    <div>
      <ul data-testid="tech-list">
        {techs.map(tech => <li key={tech}>{tech}</li>)}
      </ul>
      <button onClick={handleAddTech}>Adicionar</button>
    </div>
  );
}

export default TechList;
```

