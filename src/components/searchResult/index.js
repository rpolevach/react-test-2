import React, { useState } from "react";
import { List, Card } from "antd";

import { connect } from "react-redux";

import "./styled/searchResults.css";

const { Meta } = Card;

const Results = (props) => {
  const [isGrid, setLayout] = useState(false);

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
                  <div>{item.viewCount}</div>
                </div>
              }
              avatar={
                <iframe
                  width="245px"
                  height="138px"
                  src={`https://www.youtube.com/embed/${item.video.id.videoId}`}
                  frameBorder="0"
                  allowFullScreen
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
          <input className="results__input"></input>

          <button className="results__search-button">Найти</button>
        </div>

        <div className="results__filter-panel">
          <h3 className="results__request-name">
            Видео по запросу "{props.videos.query}"
          </h3>

          <h3 className="results__results-count">
            {props.videos.totalResults}
          </h3>

          <div className="results__view-switcher">
            <button onClick={() => setLayout(true)}>grid</button>
            <button onClick={() => setLayout(false)}>list</button>
          </div>
        </div>

        <div className="results__grid">{renderListOrGrid()}</div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  videos: state.videos,
}))(Results);
