import { combineReducers } from "redux";

import videos from "./videos";
import favourites from "./favourites";
import user from "./users";

const rootReducer = combineReducers({ videos, favourites, user });

export default rootReducer;
