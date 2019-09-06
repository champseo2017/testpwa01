import 'isomorphic-unfetch';
import { API_KEY } from './config';
const BASE_URI = 'https://api.tvmaze.com/search/shows?q=batman';
//const IMAGE_BASE_URI = 'https://image.tmdb.org/t/p';

const fetchWithErrorHandling = async url => {

  try {
    return await (await fetch(url)).json();
  } catch (err) {
    return { error: true };
  }
};

export const getPost = async () =>
  fetchWithErrorHandling(
    `${BASE_URI}`
  );