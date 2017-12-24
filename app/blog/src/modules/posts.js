import 'whatwg-fetch';
import { Config } from '../utils/config';

export const FETCH_PAGE = 'posts/FETCH_PAGE';

const initialState = {
  posts: [],
  page: 1,
  perPage: 3,
  total: 0,
}
  
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGE:
      return {
        ...state,
        posts: action.posts,
        page: action.page,
        perPage: action.perPage,
        total: action.total
      }
    default:
      return state
  }
}

export const getPosts = (page = 1) => {
  var url = Config.apiUrl + 'Posts/fetch/page?page=' + page;

  return dispatch => {
    fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(response) {
      if (response) {
        dispatch({
          type: FETCH_PAGE,
          posts: response.posts.data,
          page: response.posts.page,
          perPage: response.posts.perPage,
          total: response.posts.total
        })
      }
    })
  }
}