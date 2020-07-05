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
  let finalData = {
    query: query,
    videos: [],
  };

  dispatch({ type: FETCH_VIDEOS_REQUEST, data: null });

  try {
    let msg = await axios.get(
      `${APIurl}search?part=snippet&key=${process.env.REACT_APP_API_KEY}&type=video&q=${query}`
    );

    finalData.videos = msg.data.items;

    msg.data.items.map(async (value: any, index: any) => {
      let videoRequest = await axios.get(
        `${APIurl}videos?part=statistics&id=${value.id.videoId}&key=${process.env.REACT_APP_API_KEY}`
      );

      msg.data.items[index].viewCount =
        videoRequest.data.items.statistics.viewCount;
    });

    return dispatch({ type: FETCH_VIDEOS_SUCCESS, data: finalData });
  } catch (error) {
    return dispatch({ type: FETCH_VIDEOS_FAILURE, data: error });
  }
};

export default search;
