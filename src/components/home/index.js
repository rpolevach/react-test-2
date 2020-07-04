import React, { useState } from "react";
import { connect } from "react-redux";

import "./styled/home.css";
import search from "../../redux/actions/youtubeActions";
import { Redirect } from "react-router-dom";

const Home = (props) => {
  const [query, setQuery] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    props.onSearch(query);

    setRedirect(true);
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/results" />;
    }
  };

  return (
    <div className="home">
      {renderRedirect()}
      <div className="home__search-container">
        <h1 className="home__title">Поиск видео</h1>

        <div className="home__search">
          <input
            className="home__input"
            placeholder="Что хотите посмотреть?"
            onChange={(e) => setQuery(e.target.value)}
          ></input>

          <button className="home__search-button" onClick={handleSearch}>
            Найти
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onSearch: (query) => {
    dispatch(search(query));
  },
});

export default connect(null, mapDispatchToProps)(Home);
