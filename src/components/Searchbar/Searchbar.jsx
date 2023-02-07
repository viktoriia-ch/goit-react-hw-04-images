import { Component } from 'react';
import { IoIosSearch } from 'react-icons/io';
import PropTypes from 'prop-types';

import styles from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { search } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <header className={styles.Searchbar}>
        <form onSubmit={handleSubmit} className={styles.SearchForm}>
          <button type="submit" className={styles.SearchForm_button}>
            <IoIosSearch className={styles.SearchForm_icon} />
          </button>
          <input
            onChange={handleChange}
            className={styles.SearchForm_input}
            name="search"
            value={search}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
