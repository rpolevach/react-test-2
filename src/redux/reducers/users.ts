import { SET_USER, DELETE_USER } from "../constants";

let usersDefaultState = {
  username: "",
};

const user = (state = usersDefaultState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        username: action.username,
      };
    case DELETE_USER:
      return usersDefaultState;
    default:
      return state;
  }
};

export default user;
