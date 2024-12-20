import axios from 'axios';

const fetchArticlesWithTopic = async (topic, addAmount = 0) => {
  axios.defaults.baseURL = 'https://api.unsplash.com';
  try {
    const response = await axios.get('/search/photos', {
      params: {
        client_id: 'v7hZPQHg_dPOZ45trs456Jg5IXDMvCJnnrnnA1tiyk4',
        query: topic,
        per_page: 10 + addAmount,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export default fetchArticlesWithTopic;
