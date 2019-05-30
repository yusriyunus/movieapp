import axios from "axios";
import $ from "../../config";
import Cookies from "universal-cookie";
import { GET_LIST_MOVIES, GET_DETAIL_MOVIE } from "./type";

const DOMAIN = $.API;
const cookies = new Cookies();

const getMovieList = (title, page) => {
  const DOMAIN_INITIAL_MOVIES = `${DOMAIN}&s=${title}&page=1`;
  const DOMAIN_MOVIES_PAGE = `${DOMAIN}&s=${title}&page=${page}`;
  return async dispatch => {
    try {
      const movies = !page
        ? await axios.get(DOMAIN_INITIAL_MOVIES)
        : await axios.get(DOMAIN_MOVIES_PAGE);
      if (movies) {
        cookies.set("title", `${title}`, { path: "/" });
        cookies.set("page", `${page || 1}`, { path: "/" });
        dispatch({
          type: GET_LIST_MOVIES,
          payload: {
            movies: movies.data,
            totalResults: movies.data.totalResults,
            loading: false,
            // each initial fetch must force pagination to page 1
            forcePage: !page ? 0 : page - 1
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const getMovieDetail = imdbID => {
  return async dispatch => {
    try {
      const movies = await axios.get(`${DOMAIN}&i=${imdbID}`);
      movies &&
        dispatch({
          type: GET_DETAIL_MOVIE,
          payload: {
            movies: movies.data,
            loading: false
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export { getMovieList, getMovieDetail };
