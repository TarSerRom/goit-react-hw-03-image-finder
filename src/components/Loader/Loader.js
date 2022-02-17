import React from 'react';
import { createPortal } from 'react-dom';
import{ Audio } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './Loader.css';

const loaderRef = document.querySelector('#loader-root');

const LoaderModal = () => {
  return createPortal(
    <div className="Loader">
      <Audio
    height="100"
    width="100"
    color='blue'
    ariaLabel='loading'
  />
    </div>,
    loaderRef,
  );
};

export default LoaderModal;