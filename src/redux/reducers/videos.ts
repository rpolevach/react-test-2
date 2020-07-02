import { VideosState, VideosActions } from "../types";
import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
} from "../constants";

let videosDefaultState: VideosState = {
  isFetching: false,
  isFetched: false,
  error: null,
  videos: [],
};

const videos = (
  state = videosDefaultState,
  action: VideosActions
): VideosState => {
  switch (action.type) {
    case FETCH_VIDEOS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_VIDEOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
      };
    case FETCH_VIDEOS_FAILURE:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default videos;
