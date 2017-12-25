import 'whatwg-fetch';
import store from '../store';
import { Config } from '../utils/config';

export const FETCH_POST = 'posts/FETCH_POST';
export const FETCH_POSTS = 'posts/FETCH_POSTS';
export const UPDATE_POST = 'posts/UPDATE_POST';
export const DELETED_POST = 'posts/DELETED_POST';

const initialState = {
  posts: [],
  editPost: {},
  editPostMessage: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    case FETCH_POST:
      return {
        ...state,
        editPost: action.editPost
      }
    case UPDATE_POST:
      return {
        ...state,
        editPostMessage: {
          'id': action.posts.id,
          'success': 'Succes',
          'message': 'La note a ete modifiee'
        }
      }
    case DELETED_POST: getPosts();
      return {
        ...state,
      }
    default:
      return state;
  }
}

export const getPosts = () => {
  return dispatch => {
    fetch(Config.apiUrl + 'Posts/')
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

export const getPost = (id) => {
  return dispatch => {
    fetch(Config.apiUrl + 'Posts/' + id)
    .then(function(response) {
      return response.json();
    }).then(function(response) {
      if (response) {
        dispatch({
          type: FETCH_POST,
          editPost: response
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
        title: title,
        post: text,
        createDate: new Date(),
        updateDate: new Date(),
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

export const updatePost = (title, text, id) => {
  let post = {
    "title": title,
    "post": text,
    "id": id,
    "updateDate": new Date(),
  };

  return dispatch => {
    fetch(Config.apiUrl + 'Posts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': store.getState().user.token
      },
      body: JSON.stringify(post)
    })
    .then(function(response) {
      return response.json();
    }).then(function(response) {
      if (response) {
        dispatch({
          type: UPDATE_POST,
          posts: response
        })
      }
    })
  }
}

export const deletePost = (id) => {
  return dispatch => {
    fetch(Config.apiUrl + 'Posts/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': store.getState().user.token
      },
      body: JSON.stringify({'id': id})
    })
    .then(function(response) {
      return response.json();
    }).then(function(response) {
      if (response) {
        dispatch({
          type: DELETED_POST,
          posts: response
        })
      }
    })
  }
}