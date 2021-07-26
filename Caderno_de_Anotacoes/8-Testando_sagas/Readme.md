# Testando sagas

`yarn add redux-saga`

`yarn add axios`

## src/store/modules/techs/sagas.js

```js
import { call, put } from 'redux-saga/effects';
import api from '../../../services/api';

import { getTechsSuccess, getTechsFailure } from './actions';

export function* getTechs() {
  try {
    const response = yield call(api.get, 'techs');

    yield put(getTechsSuccess(response.data));
  } catch (err) {
    yield put(getTechsFailure());
  }
}
```

## src/services/api.js

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
```

## src/store/modules/techs/actions.js

```diff
export function addTech(tech) {
  return {
    type: 'ADD_TECH',
    payload: { tech }
  }
}

+export function getTechsSuccess(data) {
+  return {
+    type: 'GET_TECHS_SUCCESS',
+    payload: { data }
+  }
+}
+
+export function getTechsFailure() {
+  return {
+    type: 'GET_TECHS_FAILURE',
+  }
+}
```

## \__tests__/store/sagas/techs.test.js

> O teste vai falhar pq ainda não foi criado o Mock da api.

```js
import { runSaga } from 'redux-saga';

import { getTechsSuccess } from '~/store/modules/techs/actions';
import { getTechs } from '~/store/modules/techs/sagas';

describe('Techs saga', () => {
  it('should be able to fetch techs', async () => {
    const dispatch = jest.fn();

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(['Node.js']));
  });
});
```
