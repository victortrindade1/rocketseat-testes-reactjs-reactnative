# Testando reducers

Vou testar se o state está mudando.

Como vou mexer com o reducer, vou colocar o immer.

`yarn add immer`

## src/store/modules/techs/reducer.js

```js
import produce from 'immer';

export const INITIAL_STATE = [];

export default function techs(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_TECH':
        draft.push(action.payload.tech);
        break;
      default:
    }
  })
}
```

## \__tests__/store/reducers/techs.test.js

Pra cada action q gera uma alteração no reducer, eu vou criar um novo teste.

```js
import reducer, { INITIAL_STATE } from '~/store/modules/techs/reducer';
import * as Techs from '~/store/modules/techs/actions';

describe('Techs reducer', () => {
  it('ADD_TECH', () => {
    const state = reducer(INITIAL_STATE, Techs.addTech('Node.js'));

    expect(state).toStrictEqual(['Node.js']);
  })
});
```
