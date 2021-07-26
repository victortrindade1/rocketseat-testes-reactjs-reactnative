import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import TechList from '~/components/TechList';
 
describe('TechList component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should be able to add new tech', () => {
    const { getByText, getByTestId, getByLabelText } = render(<TechList />);

    fireEvent.change(getByLabelText('Technologies'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));
    
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Technologies')).toHaveValue('');
  });

  it('should store techs in storage', () => {
    /**
     * Aqui é let pq vai renderizar 2 vezes no mesmo teste, Daí deixa de ser 
     * const
     */
    let { getByText, getByTestId, getByLabelText, debug } = render(<TechList />);

    fireEvent.change(getByLabelText('Technologies'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));

    cleanup();

    /**
     * Usar entre parênteses é uma forma de continuar usando a desestruturação
     * redefinindo as variáveis
     */
    ({ getByText, getByTestId, getByLabelText } = render(<TechList />));

    /**
     * O expect(localStorage.setItem) testa se a função setItem do localStorage
     * foi chamada. Este tipo de teste, somente dá pra testar se for em um Mock.
     */
    expect(localStorage.setItem).toHaveBeenCalledWith('techs', JSON.stringify(['Node.js']));
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  });
});