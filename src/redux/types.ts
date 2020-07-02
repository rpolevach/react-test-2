import { SEARCH } from "./constants";

export interface Search {
  type: typeof SEARCH;
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

export type VideosActions = Search;

export type AppActions = VideosActions;
