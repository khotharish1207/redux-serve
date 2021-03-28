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
