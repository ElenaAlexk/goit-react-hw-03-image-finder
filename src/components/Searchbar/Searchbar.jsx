import { Component } from 'react';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handlNameChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.error('Please enter word for search');
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <div>
        <header class="searchbar">
          <form class="form" onSubmit={this.handleSubmit}>
            <button type="submit"></button>
            <input
              class="input"
              name="query"
              type="text"
              autocomplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handlNameChange}
            />
          </form>
        </header>
      </div>
    );
  }
}
