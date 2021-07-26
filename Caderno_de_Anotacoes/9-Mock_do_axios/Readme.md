# Mock do axios

É basicamente assim: qnd eu fizer uma request, eu espero tal response do axios.

Vamos usar o mock `axios-mock-adapter`.

`yarn add axios-mock-adapter -D`

## \__tests__/store/sagas/techs.test.js

```diff
import { runSaga } from 'redux-saga';
+import MockAdapter from 'axios-mock-adapter';

+import api from '~/services/api';

-import { getTechsSuccess } from '~/store/modules/techs/actions';
+import { getTechsSuccess, getTechsFailure } from '~/store/modules/techs/actions';
import { getTechs } from '~/store/modules/techs/sagas';

+const apiMock = new MockAdapter(api);

describe('Techs saga', () => {
  it('should be able to fetch techs', async () => {
    const dispatch = jest.fn();

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(['Node.js']));
  });

+  it('should fail when api returns error', async () => {
+    const dispatch = jest.fn();
+
+    apiMock.onGet('techs').reply(500);
+
+    await runSaga({ dispatch }, getTechs).toPromise();
+
+    expect(dispatch).toHaveBeenCalledWith(getTechsFailure());
+  });
});
```
