import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { createRequest } from "../../redux/actions/favouritesActions";
import { addRequestToUser, editRequest } from "../utils/findUser";

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
        order: "relevance",
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
      let checker = true;

      checker =
        this.props.type === "create"
          ? addRequestToUser(this.props.user.username, this.state.data)
          : editRequest(
              this.props.user.username,
              this.state.data,
              this.state.originalRequestName
            );

      if (checker === false) {
        console.log(checker);
        this.props.setPopContent(false);

        this.props.handleVisibleChange(true);
      }

      this.setState({
        visible: false,
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

    handleSelect = (e) => {
      this.setState((prevState) => {
        return {
          data: {
            ...prevState.data,
            order: e,
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
          defaultOrder={this.state.data.order}
          okText={this.props.type === "create" ? create.okText : edit.okText}
          cancelText={
            this.props.type === "create" ? create.cancelText : edit.cancelText
          }
          handleOnChange={this.handleOnChange}
          handleSelect={this.handleSelect}
        />
      );
    }
  };
}

const mapStateToProps = (state) => ({
  videos: state.videos,
  user: state.user,
});

const composedFieldWrapper = compose(
  connect(mapStateToProps, { createRequest }),
  withModal
);

export default composedFieldWrapper;
