import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { getImages } from 'services/getImages';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    total: 1,
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer />
      </div>
    );
  }
}
