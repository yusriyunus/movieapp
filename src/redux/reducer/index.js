import { GET_LIST_MOVIES, GET_DETAIL_MOVIE } from "../action/type";

const INITIAL_STATE = {
  movies: {},
  movieDetail: {},
  totalResults: 0,
  loading: true,
  forcePage: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIST_MOVIES:
      return {
        movies: action.payload.movies,
        totalResults: action.payload.totalResults,
        loading: action.payload.loading,
        forcePage: action.payload.forcePage
      };
    case GET_DETAIL_MOVIE:
      return {
        ...state,
        movieDetail: action.payload.movies,
        loading: action.payload.loading
      };
    default:
      return state;
  }
};
