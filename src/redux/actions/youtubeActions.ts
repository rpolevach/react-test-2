import axios from "axios";
import { Dispatch } from "redux";
import {
  APIurl,
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
} from "../constants";
import { AppActions, Video } from "../types";

interface FinalData {
  query: string;
  videos: {
    video: Video;
    viewCount: number;
  }[];
  totalResults: number;
}

const search = (query: string, maxResults = 12) => async (
  dispatch: Dispatch<AppActions>
) => {
  let finalData: FinalData = {
    query: query,
    videos: [],
    totalResults: 0,
  };

  dispatch({ type: FETCH_VIDEOS_REQUEST, data: null });

  try {
    let msg = await axios.get(
      `${APIurl}search?part=snippet&key=${
        process.env.REACT_APP_API_KEY
      }&type=video&q=${query.replace(/ /g, "+")}&maxResults=${maxResults}`
    );

    finalData.totalResults = msg.data.pageInfo.totalResults;

    msg.data.items.map((value: Video) => {
      finalData.videos.push(factoryMethod(value));
    });

    await Promise.all(
      finalData.videos.map(async (value: any, index: any) => {
        let videoRequest = await axios.get(
          `${APIurl}videos?part=statistics&id=${value.video.id.videoId}&key=${process.env.REACT_APP_API_KEY}`
        );

        finalData.videos[index].viewCount =
          videoRequest.data.items[0].statistics.viewCount;
      })
    );

    return dispatch({ type: FETCH_VIDEOS_SUCCESS, data: finalData });
  } catch (error) {
    return dispatch({ type: FETCH_VIDEOS_FAILURE, data: error });
  }
};

export default search;

const factoryMethod = (video: Video, viewCount = 0) => {
  return {
    video,
    viewCount,
  };
};
