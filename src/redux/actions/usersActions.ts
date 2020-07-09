import { Dispatch } from "redux";
import { SET_USER, DELETE_USER } from "../constants";

export const setUser = (username: string) => (dispatch: Dispatch) => {
  dispatch({ type: SET_USER, username: username });
};

export const deleteUser = () => (dispatch: Dispatch) => {
  dispatch({ type: DELETE_USER });
};
