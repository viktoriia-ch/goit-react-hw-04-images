import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import PropTypes from 'prop-types';

import styles from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(search);
  };

  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };

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
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
