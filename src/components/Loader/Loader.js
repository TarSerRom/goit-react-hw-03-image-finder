import React, { Component } from 'react';

import Loader from 'react-loader-spinner';

export default class SpinnerLoader extends Component {
  //other logic
  render() {
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
        visible={true}
      />
    );
  }
}