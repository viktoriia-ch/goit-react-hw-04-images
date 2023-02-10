import { useState, useEffect } from 'react';
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

const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  let perPage = 12;

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const data = await getImages(search, page, perPage);
          const newImages = data.hits;
          if (!newImages.length) {
            return Notify.warning('No matches found. Try again!');
          }
          setTotalHits(data.totalHits);
          setImages(prevImages => [...prevImages, ...newImages]);
        } catch (error) {
          Notify.failure(`ERROR: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };

      fetchImages();
    }
  }, [search, page, perPage]);

  const searchImages = formSearch => {
    if (formSearch === search) {
      return Notify.info('Enter a new request!');
    }
    setSearch(formSearch);
    setPage(1);
    setImages([]);
  };

  const showImage = ({ largeImageURL }) => {
    setShowModal(true);
    setLargeImage(largeImageURL);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImage('');
  };

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
};

export default App;
