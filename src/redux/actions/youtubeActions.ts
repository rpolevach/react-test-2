import axios from "axios";
import { Dispatch } from "redux";
import { APIurl } from "../constants";
import { AppActions } from "../types";

const search = (query: string) => async (dispatch: Dispatch<AppActions>) => {
  try {
    const msg = await axios.get(
      `${APIurl}search?part=snippet&key=${process.env.REACT_APP_API_KEY}&type=video&q=${query}`
    );

    //  return dispatch({ type: SEARCH });
  } catch (error) {
    console.log(error);
  }
};

export default search;
