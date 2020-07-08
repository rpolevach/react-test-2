import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

function withModal(WrappedComponent) {
  return class extends React.Component {
    state = {
      visible: false,
      confirmLoading: false,
      disabled: false,
      sliderValue: 50,
    };

    static getDerivedStateFromProps(props, state) {
      console.log(props, state);

      if (props.type === "create") {
        return {
          create: { okText: "Сохранить", cancelText: "Не сохранять" },
        };
      } else {
        return {
          edit: { okText: "Изменить", cancelText: "Не изменять" },
        };
      }
    }

    changeSlider = (e) => {
      this.setState({ sliderValue: e });
    };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    handleOk = () => {
      this.setState({
        confirmLoading: true,
      });
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 2000);
    };

    handleCancel = () => {
      this.setState({
        visible: false,
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
        />
      );
    }
  };
}

const mapStateToProps = (state) => ({
  videos: state.videos,
});

const composedFieldWrapper = compose(connect(mapStateToProps, null), withModal);

export default composedFieldWrapper;
