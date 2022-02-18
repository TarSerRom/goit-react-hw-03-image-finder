import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';

import API from './Api-service/apiService';

import Button  from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import LoaderModal from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSearch: '',
      images: [],
      status: 'idle',
      page: 1,
      buttonMore: false,
      biggerImage: '',
      showModal: false,
      error: '',
    };

    this.loadMore = this.loadMore.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageSearch;
    const nextName = this.state.imageSearch;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ status: 'pending', page: 1, images: [] });
      //this.fetchImages(nextName, nextPage);
    }
    if (prevPage !== nextPage && nextPage !== 1) {
      this.fetchImages(nextName, nextPage);
    }
     if ( nextPage > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
  }

  fetchImages(nextName, nextPage) {
    API.fetchImages(nextName, nextPage)
      .then(data => {
        this.setState(prevState => {
          return {
            prevState,
            images: [...prevState.images, ...data.hits],
            status: 'resolved',
            imageSearch: nextName,
          }
        })
      }).catch(error => this.setState({ error, status: 'rejected' }));
    }

  handleFormSubmit = (name) => {
    this.setState({ imageSearch: name, page: 1, status: 'pending' })
    this.fetchImages(name, 1);
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal, biggerImage }) => ({
      showModal: !showModal,
      biggerImage: largeImageURL,
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      showModal: false,
    }));
  };

  loadMore() {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.status === 'idle' && <p>Введите ваш запрос...</p>}
        <ImageGallery
          images={this.state.images}
          toggleModal={largeImageURL => this.toggleModal(largeImageURL)}
        />
        {this.state.status === 'pending' && <LoaderModal />}
        {this.state.images.length !== 0 && <Button loadMore={this.loadMore} />}

        {this.state.showModal && (
          <Modal
            onClick={() => {
              this.toggleModal();
            }}
            image={this.state.biggerImage}
            closeModal={this.closeModal}
          />
        )}
        <ToastContainer autoClose={3000} />
        {this.state.images.length === 0 && this.state.status === 'resolved' ? (
          <div>По запросу {this.state.imageSearch} ничего не найдено</div>
        ) : null}
        {this.state.status === 'rejected' && <div>{this.state.error}</div>}
      </div>
    );
  }
}

export default App;

