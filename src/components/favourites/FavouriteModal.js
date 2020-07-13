import React from "react";
import { Modal, Form, Input, Slider, Select } from "antd";
import { HeartOutlined } from "@ant-design/icons";

import withModal from "./withModal";

const FavouriteModal = (props) => {
  return (
    <div>
      {props.type === "create" ? (
        <HeartOutlined
          className="results__heart-icon"
          onClick={props.showModal}
        />
      ) : (
        <button
          className="favourites__button favourites__edit-button"
          onClick={props.showModal}
        >
          Изменить
        </button>
      )}

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
              onChange={(e) => {
                console.log(e.target.value);
                props.handleOnChange(e);
              }}
            />
          </Form.Item>
          <Form.Item label="Название">
            <Input
              placeholder="Укажите название"
              onChange={(e) => props.handleOnChange(e)}
              name="name"
              value={props.defaultName}
            />
          </Form.Item>

          <Form.Item label="Сортировать по">
            <Select
              defaultValue="relevance"
              onChange={(e) => props.handleSelect(e)}
              value={props.defaultOrder}
            >
              <Select.Option value="relevance">актуальности</Select.Option>
              <Select.Option value="date">дате</Select.Option>
              <Select.Option value="rating">ретингу</Select.Option>
              <Select.Option value="title">названию</Select.Option>
              <Select.Option value="videoCount">кол-ву видео</Select.Option>
              <Select.Option value="viewCount">просмотрам</Select.Option>
            </Select>
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
