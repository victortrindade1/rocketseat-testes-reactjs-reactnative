# Mock do useDispatch

Teste pra monitorar se a função useDispatch foi disparada.

Aqui será feito parecido como foi feito com useSelector, mas ao invés de usar
`mockImplementation`, vou usar `mockReturnValue`. Agora, sempre q o useDispatch
for chamado, eu vou alterar o valor do return pra um valor fictício. Dessa
forma, estou "mockando" a função useDispatch.

## \__tests__/components/TechList.test.js

```diff
import React from 'react';
-import { useSelector } from 'react-redux';
+import { useSelector, useDispatch } from 'react-redux';
-import { render } from '@testing-library/react';
+import { render, fireEvent } from '@testing-library/react';

+import { addTech } from '~/store/modules/techs/actions';
import TechList from '~/components/TechList';

jest.mock('react-redux');

describe('TechList component', () => {
  it('should render tech list', () => {
    useSelector.mockImplementation(cb => cb({
      techs: ['Node.js', 'ReactJS']
    }));

    const { getByTestId, getByText } = render(<TechList />);

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
  });

+  it('should be able to add new tech', () => {
+    const { getByTestId, getByLabelText } = render(<TechList />);
+
+    const dispatch = jest.fn();
+
+    useDispatch.mockReturnValue(dispatch);
+
+    fireEvent.change(getByLabelText('Technologies'), { target: { value: 'Node.js' } });
+    fireEvent.submit(getByTestId('tech-form'));
+
+    console.log(dispatch.mock.calls);
+
+    // expect(dispatch).toHaveBeenCalledWith({
+    //   type: 'ADD_TECH',
+    //   payload: { tech: 'Node.js' }
+    // });
+
+    // ou, com uma action encapsulada:
+    expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));
+  });
});
```

## src/components/TechList/index.js

```diff
import React, { useState } from 'react';
-import { useSelector } from 'react-redux';
+import { useSelector, useDispatch } from 'react-redux';

+import { addTech } from '../../store/modules/techs/actions';

// import { Container } from './styles';

function TechList() {
  const [newTech, setNewTech] = useState('');

+  const dispatch = useDispatch();
  const techs = useSelector(state => state.techs);

  function handleAddTech() {
+    dispatch(addTech(newTech));

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

## src/store/modules/techs/actions.js

```js
export function addTech(tech) {
  return {
    type: 'ADD_TECH',
    payload: { tech }
  }
}
```
