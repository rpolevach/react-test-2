import { VideosState, VideosActions } from "../types";
import { SEARCH } from "../constants";

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
    case SEARCH:
      return state;
    default:
      return state;
  }
};

export default videos;
