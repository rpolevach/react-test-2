import React from "react";

export const popoverCreate = () => (
  <div>
    <h3>Поиск сохранен в разделе избранное</h3>

    <a href="/fav">Перейти в избранное</a>
  </div>
);

export const popoverAlreadyExists = () => (
  <div>
    <h3>Данный поиск уже сохранен</h3>

    <a href="/fav">Перейти в избранное</a>
  </div>
);
