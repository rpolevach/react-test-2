import axios from "axios";
import { Dispatch } from "redux";
import {
  APIurl,
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
} from "../constants";
import { AppActions } from "../types";

const search = (query: string) => async (dispatch: Dispatch<AppActions>) => {
  dispatch({ type: FETCH_VIDEOS_REQUEST, data: null });

  try {
    const msg = await axios.get(
      `${APIurl}search?part=snippet&key=${process.env.REACT_APP_API_KEY}&type=video&q=${query}`
    );

    return dispatch({ type: FETCH_VIDEOS_SUCCESS, data: msg.data.items });
  } catch (error) {
    return dispatch({ type: FETCH_VIDEOS_FAILURE, data: error });
  }
};

export default search;
