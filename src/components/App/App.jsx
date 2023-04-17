import React, { Component } from 'react';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from '../../services/getImages';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    page: 1,
    totalHits: '',
    error: null,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getSearch(query, page);
    }
  }

  getSearch = (query, page) => {
    this.setState({ isLoading: true });

    getImages(query, page)
      .then(res => res.json())
      .then(({ hits, totalHits }) => {
        if (totalHits === 0) {
          toast.error('Sorry, there are no images matching your search query.');
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalHits,
        }));
      })
      .catch(error => {
        toast.error(`Something went wrong...`);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = query => {
    if (query === this.state.query) {
      return;
    }
    this.setState({ query, page: 1, images: [] });
  };

  //openModal = (largeImageUrl, alt) => {
  //this.setState(({ showModal }) => {
  //return { showModal: !showModal, largeImageUrl, alt };
  //});
  //};

  toggleModal = () => {
    this.setState(({ showModal }) => {
      return { showModal: !showModal };
    });
  };

  render() {
    const {
      page,
      images,
      isLoading,
      totalHits,
      largeImageUrl,
      alt,
      showModal,
    } = this.state;
    const total = totalHits / 12;
    return (
      <div className={css.App}>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery onClick={this.toggleModal} images={images} />
        {isLoading && <Loader />}
        {!isLoading && total > page && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal closeModal={this.toggleModal}>
            <img src={largeImageUrl} alt={alt} />
          </Modal>
        )}
      </div>
    );
  }
}
