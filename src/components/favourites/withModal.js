import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { createRequest } from "../../redux/actions/favouritesActions";
import { addRequestToUser, editRequest, findUser } from "../utils/findUser";

function withModal(WrappedComponent) {
  return class extends React.Component {
    state = {
      visible: false,
      confirmLoading: false,
      disabled: false,
      data: {
        query: "",
        name: "",
        maxResults: 25,
      },
      originalRequestName: "",
    };

    static getDerivedStateFromProps(props, state) {
      console.log("getDerivedStateFromProps");

      if (props.type === "create") {
        return {
          create: {
            okText: "Сохранить",
            cancelText: "Не сохранять",
          },
          data: { ...state.data, query: props.videos.query },
        };
      } else {
        if (!state.edit) {
          console.log("asd");
          return {
            edit: { okText: "Изменить", cancelText: "Не изменять" },
            data: {
              ...props.request,
            },
            originalRequestName: props.request.name,
          };
        } else {
          return {
            edit: { okText: "Изменить", cancelText: "Не изменять" },
          };
        }
      }
    }

    changeSlider = (e) => {
      console.log(e);

      this.setState((prevState) => {
        return {
          data: {
            ...prevState.data,
            maxResults: e,
          },
        };
      });
    };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    handleOk = () => {
      this.props.type === "create"
        ? addRequestToUser(this.props.user.username, this.state.data)
        : editRequest(
            this.props.user.username,
            this.state.data,
            this.state.originalRequestName
          );

      this.setState({
        visible: false,
      });

      document.location.reload();
    };

    handleCancel = () => {
      this.setState({
        visible: false,
      });
    };

    handleOnChange = (e) => {
      const { name, value } = e.target;

      console.log(value);

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
          defaultQuery={this.state.data.query}
          defaultName={this.state.data.name}
          okText={this.props.type === "create" ? create.okText : edit.okText}
          cancelText={
            this.props.type === "create" ? create.cancelText : edit.cancelText
          }
          handleOnChange={this.handleOnChange}
        />
      );
    }
  };
}

const mapStateToProps = (state) => ({
  videos: state.videos,
  user: state.user,
});

const mapPropsToDispatch = () => ({
  createRequest,
});

const composedFieldWrapper = compose(
  connect(mapStateToProps, { createRequest }),
  withModal
);

export default composedFieldWrapper;
