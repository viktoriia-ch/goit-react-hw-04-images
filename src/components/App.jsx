import { Component } from 'react';
import { Notify } from 'notiflix';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import LargeImage from './LargeImage/LargeImage';

import Modal from '../shared/components/Modal/Modal';
import { getImages } from '../shared/services/images-api';

import styles from './styles.module.css';

class App extends Component {
  state = {
    images: [],
    search: '',
    page: 1,
    perPage: 12,
    totalHits: 0,
    loading: false,
    showModal: false,
    largeImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (search !== prevState.search || page !== prevState.page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    try {
      this.setState({ loading: true });
      const { search, page, perPage } = this.state;
      const data = await getImages(search, page, perPage);
      const newImages = data.hits;

      if (!newImages.length) {
        return Notify.warning('No matches found. Try again!');
      }

      this.setState({
        totalHits: data.totalHits,
      });

      this.setState(({ images }) => ({
        images: [...images, ...newImages],
      }));
    } catch (error) {
      Notify.failure(`ERROR: ${error.message}`);
    } finally {
      this.setState({ loading: false });
    }
  };

  searchImages = ({ search }) => {
    if (search === this.state.search) {
      return Notify.info('Enter a new request!');
    }
    this.setState({
      search,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showImage = ({ largeImageURL }) => {
    this.setState({
      showModal: true,
      largeImage: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImage: '',
    });
  };

  render() {
    const { images, loading, showModal, largeImage, totalHits, perPage, page } =
      this.state;
    const { searchImages, loadMore, showImage, closeModal } = this;

    return (
      <div className={styles.App_container}>
        <Searchbar onSubmit={searchImages} />
        <ImageGallery>
          <ImageGalleryItem images={images} showImage={showImage} />
        </ImageGallery>
        {loading && <Loader />}
        {Boolean(images.length) && totalHits / perPage > page && (
          <Button loadMore={loadMore} />
        )}
        {showModal && (
          <Modal close={closeModal}>
            <LargeImage largeImageURL={largeImage} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
