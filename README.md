# Redux-serve cli

Smart CLI service to create store, actions, reducer and saga with dynamic options

![Redux-util cli](https://raw.githubusercontent.com/khotharish1207/redux-serve/master/assets/redux-serve.JPG)

### Features
- Kickstart to your redux setup
- Increase productivity
- Predefined templetes for actions, reducer, saga

### Available commands
- createstore
- createactions
- createreducer
- createsaga
- install
 
## Getting Started

### Prerequisites

You just need `nodejs` and `npm` installed on your system

### Installing
You can install the package with following command. It is recommended to install at goble level

```
npm install redux-serve -g
```

### How to use

#### createstore

The basic need for integrating redux is to create store and its related directories. The default directory structure will be created at the CWD where you triggered the command

```
redux-serve createstore
```

It will create `redux` directory with following structure

![directory with following structure](https://raw.githubusercontent.com/khotharish1207/redux-serve/master/assets/directory.JPG)

#### createactions

```
redux-serve createactions
```
This command will create file with name `actions.js` with few predefined actions. You can editing this file 

```
export const ACTION = "ACTION";
export const action = (payload) => ({
    type: ACTION,
    payload
})

export const SAGA_ACTION = "SAGA_ACTION";
export const sagaAction = (payload) => ({
    type: SAGA_ACTION,
    payload
})
```

#### createreducer

```
redux-serve createreducer
```
This command will create file with name `reducer.js` with few predefined reducer function.
```
import { ACTION } from "actions"; // replace with your path/to/actions

const INITIAL_STATE = {  };

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ACTION:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default reducer;
```

#### createsaga

```
redux-serve createsaga
```
This command will create file with name `saga.js` with few predefined handler function.
```
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { SAGA_ACTION, action } from "actions"; // // replace with your path/to/actions

export function* handler() {
  try {
    const config = {
      method: "GET",
      url: `url`
    };
    const { data } = yield call(axios, config);
    yield put(action(data));
  } catch (error) {
    // console.error(error);
  }
}

export default function*() {
  yield all([takeLatest(SAGA_ACTION, handler)]);
}

```

#### install
```
redux-serve install
```
This command will install *redux store* required dependencies. recommended to trigger on root of your project.
-  redux 
-  redux-devtools-extension 
-  redux-saga 
-  react-redux

### Additinal options

The library support `known options` 
- `path` - This is to set path where to create reducer/saga/actions file. The provided *path* should be accessible 
- `name` - This is to provide custom name to reducer/saga/actions file.
- `template` This is to override existing file templates. You need to provide relative path to your template file.

#### example

````
redux-serve createactions 
  -p ./redux/actions 
  -n myCustomActions.js 
  -t ./path/to/your/desired/action-file.js
````
This command will create actions file with name `myCustomActions.js` to `CWD/redux/actions` with the contents of `./path/to/your/desired/action-file.js`

Note: All `path` provided to the options should relative to `CWD`

## Author

- **Harish S Khot**

