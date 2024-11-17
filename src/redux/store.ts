import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import urlReducer from "./urlReducer"; 

const rootReducer = combineReducers({
  urlReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware))
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
