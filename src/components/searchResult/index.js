import React, { useState, useEffect } from "react";
import { List, Popover } from "antd";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";
import { connect, useSelector } from "react-redux";

import "./styled/searchResults.css";
import search from "../../redux/actions/youtubeActions";
import FavouriteModal from "../favourites/FavouriteModal";
import { popoverCreate, popoverAlreadyExists } from "./styled/popover";

const Results = (props) => {
  const [isGrid, setLayout] = useState(false);
  const [query, setQuery] = useState("");
  const [isPopVisible, setVisible] = useState(false);
  const [popContent, setPopContent] = useState(true);
  const reduxQuery = useSelector((state) => state.videos.query);

  useEffect(() => {
    if (reduxQuery) {
      setQuery(reduxQuery);
    }
  }, [reduxQuery]);

  const handleSearch = (e) => {
    e.preventDefault();

    props.onSearch(query);
  };

  const handleVisibleChange = (visible) => {
    setVisible((prevState) => {
      return { ...prevState, visible };
    });

    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  const renderListOrGrid = () => {
    return isGrid ? (
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={props.videos.videos}
        renderItem={(item) => (
          <List.Item>
            <iframe
              width="245px"
              height="138px"
              src={`https://www.youtube.com/embed/${item.video.id.videoId}`}
              frameBorder="0"
              allowFullScreen
              title={item.video.id}
            ></iframe>
            <div className="results__video-title">
              {item.video.snippet.title}
            </div>

            <div className="results__channel-title">
              {item.video.snippet.channelTitle}
              <p>{item.viewCount} просмотров</p>
            </div>
          </List.Item>
        )}
      ></List>
    ) : (
      <List
        itemLayout="horizontal"
        dataSource={props.videos.videos}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.video.snippet.title}
              description={
                <div>
                  <div>{item.video.snippet.channelTitle}</div>
                  <div>{item.viewCount} просмотров</div>
                </div>
              }
              avatar={
                <iframe
                  width="245px"
                  height="138px"
                  src={`https://www.youtube.com/embed/${item.video.id.videoId}`}
                  frameBorder="0"
                  allowFullScreen
                  title={item.video.id}
                ></iframe>
              }
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    );
  };

  return (
    <div className="results">
      <div className="results__results-container">
        <h2 className="results__title">Поиск видео</h2>

        <div className="results__search">
          <input
            className="results__input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Что хотите посмотреть?"
          ></input>

          <Popover
            content={popContent ? popoverCreate : popoverAlreadyExists}
            onVisibleChange={handleVisibleChange}
            visible={isPopVisible}
          />

          <FavouriteModal
            type="create"
            handleVisibleChange={handleVisibleChange}
            setPopContent={setPopContent}
          />

          <button className="results__search-button" onClick={handleSearch}>
            Найти
          </button>
        </div>

        <div className="results__filter-panel">
          <h3 className="results__request-name">
            Видео по запросу "{props.videos.query}"
          </h3>

          <h3 className="results__results-count">
            {props.videos.totalResults}
          </h3>

          <div className="results__view-switcher">
            <UnorderedListOutlined
              className="results__list-icon"
              onClick={() => setLayout(false)}
            />

            <AppstoreOutlined
              className="results__grid-icon"
              onClick={() => setLayout(true)}
            />
          </div>
        </div>

        <div className="results__grid">{renderListOrGrid()}</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onSearch: (query) => {
    dispatch(search(query));
  },
});

export default connect(
  (state) => ({
    videos: state.videos,
  }),
  mapDispatchToProps
)(Results);
