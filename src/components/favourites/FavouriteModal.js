import React from "react";
import { Modal, Form, Input, Slider } from "antd";
import { HeartOutlined } from "@ant-design/icons";

import withModal from "./withModal";

const FavouriteModal = (props) => {
  return (
    <div>
      <HeartOutlined
        className="results__heart-icon"
        onClick={props.showModal}
      />
      <Modal
        title="Сохранить запрос"
        visible={props.visible}
        onOk={props.handleOk}
        okText={props.okText}
        confirmLoading={props.confirmLoading}
        onCancel={props.handleCancel}
        cancelText={props.cancelText}
      >
        <Form layout="vertical">
          <Form.Item label="Запрос">
            <Input
              value={props.defaultQuery}
              disabled={props.type === "create" ? true : false}
              name="query"
            />
          </Form.Item>
          <Form.Item label="Название">
            <Input
              placeholder="Укажите название"
              onChange={(e) => props.handleOnChange(e)}
              name="name"
            />
          </Form.Item>
          <Form.Item>
            <Slider
              defaultValue={props.data.maxResults}
              disabled={props.disabled}
              onChange={props.changeSlider}
              value={props.data.maxResults}
              name="maxResults"
            />

            <Input
              value={props.data.maxResults}
              onChange={(e) => props.changeSlider(e.target.value)}
              name="maxResults"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default withModal(FavouriteModal);
