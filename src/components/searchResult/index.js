import React from "react";

import "./styled/searchResults.css";

const Results = () => {
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

        <div className="results__grid"></div>
      </div>
    </div>
  );
};

export default Results;
