import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { createRequest } from "../../redux/actions/favouritesActions";

function withModal(WrappedComponent) {
  return class extends React.Component {
    state = {
      visible: false,
      confirmLoading: false,
      disabled: false,
      data: {
        query: "",
        name: "",
        maxResults: 50,
      },
    };

    static getDerivedStateFromProps(props, state) {
      if (props.type === "create") {
        return {
          create: {
            okText: "Сохранить",
            cancelText: "Не сохранять",
          },
          data: { ...state.data, query: props.videos.query },
        };
      } else {
        return {
          edit: { okText: "Изменить", cancelText: "Не изменять" },
        };
      }
    }

    changeSlider = (e) => {
      this.setState({ data: { maxResults: e } });
    };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    handleOk = () => {
      /*this.setState({
        confirmLoading: true,
      });
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 2000); */

      this.props.createRequest(this.state.data);

      this.setState({
        // visible: false,
      });
    };

    handleCancel = () => {
      this.setState({
        visible: false,
      });
    };

    handleOnChange = (e) => {
      const { name, value } = e.target;

      this.setState((prevState) => {
        return {
          data: {
            ...prevState.data,
            [name]: value,
          },
        };
      });
    };

    render() {
      const { create, edit } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          showModal={this.showModal}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          changeSlider={this.changeSlider}
          defaultQuery={this.props.videos.query}
          okText={create.okText || edit.okText}
          cancelText={create.cancelText || edit.cancelText}
          handleOnChange={this.handleOnChange}
        />
      );
    }
  };
}

const mapStateToProps = (state) => ({
  videos: state.videos,
});

const mapPropsToDispatch = () => ({
  createRequest,
});

const composedFieldWrapper = compose(
  connect(mapStateToProps, { createRequest }),
  withModal
);

export default composedFieldWrapper;
