import { CREATE_REQUEST, EDIT_REQUEST, DELETE_REQUEST } from "../constants";
import { Request, RequestActions } from "../types";

const favourites = (state = [], action: RequestActions): Request[] => {
  switch (action.type) {
    case CREATE_REQUEST:
      return [...state, action.data];
    case EDIT_REQUEST:
      return state;
    case DELETE_REQUEST:
      return state;
    default:
      return state;
  }
};

export default favourites;
