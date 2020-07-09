import React, { useState } from "react";
import { List } from "antd";
import { useSelector, connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./styled/favourites.css";
import { findUser, deleteRequest } from "../utils/findUser";
import search from "../../redux/actions/youtubeActions";

export const Favourites = (props) => {
  const [redirect, setRedirect] = useState(false);
  const user = useSelector((state) => state.user);

  const handleSearch = (e, query) => {
    e.preventDefault();

    props.onSearch(query);

    setRedirect(true);
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/results" />;
    }
  };

  const onDelete = (name) => {
    deleteRequest(user.username, name);
    document.location.reload();
  };

  return (
    <div className="favourites">
      {renderRedirect()}
      <div className="favourites__favourites-container">
        <h2 className="favourites__title">Избранное</h2>

        <div className="favourites__requests">
          <List
            bordered
            dataSource={findUser(user.username).requests}
            renderItem={(item) => (
              <List.Item className="favourites__list-item">
                <div onClick={(e) => handleSearch(e, item.query)}>
                  {item.name}
                </div>
                <button className="favourites__button favourites__edit-button">
                  Изменить
                </button>
                <button
                  className="favourites__button favourites__delete-button"
                  onClick={() => onDelete(item.name)}
                >
                  Удалить
                </button>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

const mapPropsToDispatch = (dispatch) => ({
  onSearch: (username) => {
    dispatch(search(username));
  },
});

export default connect(null, mapPropsToDispatch)(Favourites);
