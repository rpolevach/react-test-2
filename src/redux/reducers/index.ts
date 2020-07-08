import { combineReducers } from "redux";

import videos from "./videos";
import favourites from "./favourites";

const rootReducer = combineReducers({ videos, favourites });

export default rootReducer;
