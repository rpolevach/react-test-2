import { Dispatch } from "redux";
import { AppActions } from "../types";
import { CREATE_REQUEST } from "../constants";

export const createRequest = (data: {
  query: string;
  name: string;
  maxResults: number;
}) => (dispatch: Dispatch<AppActions>) => {
  dispatch({ type: CREATE_REQUEST, data: data });
};

export const editRequest = () => {};

export const deleteRequest = () => {};
