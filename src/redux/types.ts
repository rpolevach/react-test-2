import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  CREATE_REQUEST,
  EDIT_REQUEST,
  DELETE_REQUEST,
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
  viewCount: string;
}

export interface VideosState {
  isFetching: boolean;
  isFetched: boolean;
  error: any;
  videos: Video[];
  query: string;
  totalResults: number;
}

export type VideosActions = GetVideos;

export interface Request {
  query: string;
  name: string;
  maxResults: number;
}

interface CreateRequest {
  type: typeof CREATE_REQUEST;
  data: Request;
}

interface EditRequest {
  type: typeof EDIT_REQUEST;
}

interface DeleteRequest {
  type: typeof DELETE_REQUEST;
}

export type RequestActions = CreateRequest | EditRequest | DeleteRequest;

export type AppActions = VideosActions | RequestActions;
