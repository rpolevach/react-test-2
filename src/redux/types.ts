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
  data?: any;
}

interface Thumbnail {
  height: number;
  url: string;
  width: number;
}

export interface Video {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: Thumbnail;
      high: Thumbnail;
      medium: Thumbnail;
    };
    title: string;
  };
}

export interface VideosState {
  isFetching: boolean;
  isFetched: boolean;
  error: any;
  videos: Video[];
}

export type VideosActions = GetVideos;

export type AppActions = VideosActions;
