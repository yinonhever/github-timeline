import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import repos from "./reducers/repos";
import history from "./reducers/history";

const reducer = combineReducers({ repos, history });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;