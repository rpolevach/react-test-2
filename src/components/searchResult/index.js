import React from "react";
import { List, Card } from "antd";

import { connect } from "react-redux";

import "./styled/searchResults.css";

const { Meta } = Card;

const Results = (props) => {
  return (
    <div className="results">
      <div className="results__results-container">
        <h2 className="results__title">Поиск видео</h2>

        <div className="results__search">
          <input className="results__input"></input>

          <button className="results__search-button">Найти</button>
        </div>

        <div className="results__filter-panel">
          <h3 className="results__request-name">Видео по запросу "test"</h3>

          <h3 className="results__results-count">7230</h3>

          <div className="results__view-switcher">
            <a>grid</a>
            <a>list</a>
          </div>
        </div>

        <div className="results__grid">
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={props.videos.videos}
            renderItem={(item) => (
              <List.Item>
                <iframe
                  width="245px"
                  height="138px"
                  src={`https://www.youtube.com/embed/${item.id.videoId}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <div className="results__video-title">{item.snippet.title}</div>

                <div className="results__channel-title">
                  {item.snippet.channelTitle}
                  <p>1000000 просмотров</p>
                </div>
              </List.Item>
            )}
          ></List>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  videos: state.videos,
}))(Results);
