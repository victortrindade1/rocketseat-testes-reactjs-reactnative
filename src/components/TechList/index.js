import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addTech } from '../../store/modules/techs/actions';

// import { Container } from './styles';

function TechList() {
  const [newTech, setNewTech] = useState('');

  const dispatch = useDispatch();
  const techs = useSelector(state => state.techs);

  function handleAddTech() {
    // dispatch({ type: 'ADD_TECH', payload: { tech: newTech } });
    dispatch(addTech(newTech));

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