import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user'
import posts from './posts'
import adminPosts from './adminPosts'

export default combineReducers({
  router: routerReducer,
  user,
  posts,
  adminPosts,
})