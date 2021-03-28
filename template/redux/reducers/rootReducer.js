import { combineReducers } from "redux";

/**
 * Import reducers
 */
import app from './sampleReducer'

/**
 * Create store state
 */
const rootReducer = combineReducers({
  app
});

export default rootReducer;
