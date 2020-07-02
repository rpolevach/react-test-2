import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
} from "./constants";

export interface GetVideos {
  type:
    | typeof FETCH_VIDEOS_REQUEST
    | typeof FETCH_VIDEOS_SUCCESS
    | typeof FETCH_VIDEOS_FAILURE;
}

export interface Video {
  id: string;
}

export interface VideosState {
  isFetching: boolean;
  isFetched: boolean;
  error: any;
  videos: Video[];
}

export type VideosActions = GetVideos;

export type AppActions = VideosActions;
