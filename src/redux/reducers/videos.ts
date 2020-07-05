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
  query: "",
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
        videos: action.data.videos,
        query: action.data.query,
      };
    case FETCH_VIDEOS_FAILURE:
      return {
        ...state,
        error: action.data,
      };
    default:
      return state;
  }
};

export default videos;
