import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
  // blacklist: ["videos"],
};

const persReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export let persistor = persistStore(store);
