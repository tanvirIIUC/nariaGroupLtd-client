import { configureStore } from '@reduxjs/toolkit'
import  getPostsReducer from './features/getPostsSlice'
// import { getPostsSlice } from './features/getPostsSlice'
export const store = configureStore({
  reducer: {
    allPosts: getPostsReducer
  },
})