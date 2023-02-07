import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '31874825-b26954bf3f9b68024b47f53ce',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const getImages = async (q, page, perPage) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
      per_page: perPage,
    },
  });

  return data;
};
