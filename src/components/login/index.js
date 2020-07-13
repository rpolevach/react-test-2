import React, { useState } from "react";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";

import "antd/dist/antd.css";
import "./styled/login.css";
import LogoSvg from "./styled/logo.svg";
import fakeAuth from "./fakeAuth.json";
import { setUser } from "../../redux/actions/usersActions";

const Login = (props) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const onFinish = (values) => {
    let isUserExist = false;

    let users = fakeAuth.users;

    users.forEach((value) => {
      if (
        value.username === values.username &&
        value.password === values.password
      ) {
        isUserExist = true;
      }
    });

    if (isUserExist) {
      const token = jwt.sign(
        {
          username: data.username,
          password: data.password,
        },
        "secretkey"
      );

      props.setUser(data.username);

      localStorage.setItem("user", token);
      props.history.push("/");
    }
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <img src={LogoSvg} className="logo" alt="test" />

      <h3 className="title">Вход</h3>

      <Form.Item
        className="form-input"
        name="username"
        rules={[{ required: true, message: "Пожалуйста, введите логин!" }]}
      >
        <Input
          onChange={(e) =>
            setData((prevState) => {
              return { ...prevState, username: e.target.value };
            })
          }
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Логин"
        />
      </Form.Item>

      <Form.Item
        className="form-input"
        name="password"
        rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
      >
        <Input.Password
          onChange={(e) =>
            setData((prevState) => {
              return { ...prevState, password: e.target.value };
            })
          }
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(null, { setUser })(Login);
