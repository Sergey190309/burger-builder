import React from "react";

import Modal from "../../components/UI/modal/modal.component";
import Aux from "../auxiliary/auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {

  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null
        // requestInterceptor: null,
        // responseInterceptor: null
      };
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      });

    };

    // componentWillMount() {
    //   this.requestInterceptor = axios.interceptors.request.use(req => {
    //     this.setState({ error: null });
    //     return req;
    //   });
    //   this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
    //     this.setState({error: error})
    //   });
    // };

    componentWillUnmount() {
      // console.log(
      //   "[withErrorHandler] will unmount",
      //   this.requestInterceptor,
      //   this.responseInterceptor
      // );
      axios.interceptor.request.eject(this.requestInterceptor);
      axios.interceptor.response.eject(this.responseInterceptor);
    };

    errorConfirmedHandler = () => {
      this.setState({error: null})
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClose={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    };
  };
};

export default withErrorHandler;
