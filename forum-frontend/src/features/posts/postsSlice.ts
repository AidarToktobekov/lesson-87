import { Post, Comment} from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { commentsFetch, postFetch, postsFetch } from './postsThunk';

interface PostState {
  posts: Post[];
  postsLoading: boolean;
  onePost: Post | null;
  onePostLoading: boolean;
  comments: Comment[];
  commentsLoading: boolean;
}

const initialState: PostState = {
    posts: [],
    postsLoading: false,
    onePost: null,
    onePostLoading: false,
    comments: [],
    commentsLoading: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postsFetch.pending, (state) => {
        state.postsLoading = true;
      })
      .addCase(postsFetch.fulfilled, (state, { payload: posts }) => {
        state.postsLoading = false;
        state.posts = posts;
      })
      .addCase(postsFetch.rejected, (state) => {
        state.postsLoading = false;
      })
      .addCase(postFetch.pending, (state)=>{
        state.onePostLoading = true;
      })
      .addCase(postFetch.fulfilled, (state, {payload: post})=>{
        state.onePostLoading = false;
        state.onePost = post;
      })
      .addCase(postFetch.rejected, (state)=>{
        state.onePostLoading = false;
      })
      .addCase(commentsFetch.pending, (state)=>{
        state.commentsLoading = true;
      })
      .addCase(commentsFetch.fulfilled, (state, {payload: comments})=>{
        state.commentsLoading = false;
        state.comments = comments;
      })
      .addCase(commentsFetch.rejected, (state)=>{
        state.commentsLoading = false;
      })
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectPostsLoading: (state) => state.postsLoading,
    selectPost: (state) => state.onePost,
    selectPostLoading: (state) => state.onePostLoading,
    selectComments: (state) => state.comments,
    selectCommentsLoading: (state) => state.commentsLoading,
  },
});

export const postsReducer = postsSlice.reducer;


export const { selectPosts, selectPostsLoading, selectPost, selectPostLoading, selectComments, selectCommentsLoading} =
  postsSlice.selectors;