import React, { useState } from "react";

import "./styled/home.css";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState("");

  const APIkey = "AIzaSyAH-v5rpoexEGJwe8PW4xVERS1gnkMAMww";

  const onSearch = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${APIkey}&type=video&q=${data}`
      )
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="home">
      <div className="home__search-container">
        <h1 className="home__title">Поиск видео</h1>

        <div className="home__search">
          <input
            className="home__input"
            placeholder="Что хотите посмотреть?"
            onChange={(e) => setData(e.target.value)}
          ></input>

          <button className="home__search-button" onClick={onSearch}>
            Найти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
