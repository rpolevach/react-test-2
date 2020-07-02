import React, { useState } from "react";
import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import LogoSvg from "../login/styled/logo.svg";
import "./styled/navbar.css";

const Navbar = () => {
  const [current, setCurrent] = useState("mail");

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const onLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail" icon={<MailOutlined />}>
        <Link to="/">Поиск</Link>
      </Menu.Item>

      <Menu.Item key="app" icon={<AppstoreOutlined />}>
        <Link to="/fav">Избранное</Link>
      </Menu.Item>

      <Menu.Item key="exit" icon={<AppstoreOutlined />} onClick={onLogout}>
        Выйти
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
