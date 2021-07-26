# Testando formulário

O app terá um input, onde o usuário insere a tecnologia e adiciona.

## \__tests__/components/TechList.test.js

```diff
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TechList from '~/components/TechList';
 
describe('TechList component', () => {
  it('should be able to add new tech', () => {
-    const { getByText, getByTestId, debug } = render(<TechList />);
+    const { getByText, getByTestId, getByLabelText } = render(<TechList />);

-    debug();

-    fireEvent.click(getByText('Adicionar'));
+    fireEvent.change(getByLabelText('Technologies'), { target: { value: 'Node.js' } });
+    fireEvent.submit(getByTestId('tech-form'));

-    debug();
    
-    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
+    expect(getByLabelText('Technologies')).toHaveValue('');
  })
})
```

## src/components/TechList/index.js

```diff
import React, { useState } from 'react';

// import { Container } from './styles';

function TechList() {
  const [techs, setTechs] = useState([]);
+  const [newTech, setNewTech] = useState('');

  function handleAddTech() {
    setTechs([...techs, 'Node.js']);
+    setNewTech('');
  }

  return (
-   <div>
+   <form data-testid="tech-form" onSubmit={handleAddTech}>
      <ul data-testid="tech-list">
        {techs.map(tech => <li key={tech}>{tech}</li>)}
      </ul>
      
+      <label htmlFor="tech">Technologies</label>
+      <input id="tech" 
+        value={newTech} 
+        onChange={e => setNewTech(e.target.value)} 
+      />
      <button onClick={handleAddTech}>Adicionar</button>
-   </div>
+   </form>
  );
}

export default TechList;
```
