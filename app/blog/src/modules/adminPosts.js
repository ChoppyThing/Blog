import 'whatwg-fetch';
import store from '../store';
import { Config } from '../utils/config';

export const FETCH_POSTS = 'posts/FETCH_POSTS';
export const CREATE_POST = 'posts/CREATE_POST';

const initialState = {
  posts: []
}
  
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state
  }
}

export const getPosts = (page = 1) => {
  return dispatch => {
    fetch(Config.apiUrl + 'Posts')
    .then(function(response) {
      return response.json();
    }).then(function(response) {
      if (response) {
        dispatch({
          type: FETCH_POSTS,
          posts: response
        })
      }
    })
  }
}

export const createPosts = (title, text) => {
  return dispatch => {
    fetch(Config.apiUrl + 'Posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': store.getState().user.token
      },
      body: JSON.stringify({
        Title: title,
        Post: text
      })
    })
    .then(function(response) {
      return response.json();
    }).then(function(response) {
      if (response) {
        /*dispatch({
          type: FETCH_POSTS,
          posts: response
        })*/
      }
    })
  }
}