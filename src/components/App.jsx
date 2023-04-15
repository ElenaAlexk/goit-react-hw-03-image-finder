import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from '../services/getImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    page: 1,
    totalHits: '',
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        getImages(query, page).then(res =>
          res.json().then(({ hits, totalHits }) => {
            this.setState(prevState => {
              return { images: [...prevState.images, ...hits], totalHits };
            });
          })
        );
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  }

  handleFormSubmit = query => {
    if (query === this.state.query) {
      return;
    }
    this.setState({ query, page: 1, images: [] });
  };

  render() {
    const { images } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        <ToastContainer />
      </div>
    );
  }
}
