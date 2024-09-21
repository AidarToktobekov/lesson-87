import { Post, Comment} from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { commentsFetch, createComment, createPost, postFetch, postsFetch } from './postsThunk';

interface PostState {
  posts: Post[];
  postsLoading: boolean;
  onePost: Post | null;
  onePostLoading: boolean;
  comments: Comment[];
  commentsLoading: boolean;
  commentsFormLoading: boolean;
  postsFormLoading: boolean;
}

const initialState: PostState = {
    posts: [],
    postsLoading: false,
    onePost: null,
    onePostLoading: false,
    comments: [],
    commentsLoading: false,
    commentsFormLoading: false,
    postsFormLoading: false
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
      .addCase(createComment.pending, (state)=>{
        state.commentsFormLoading = true;
      })
      .addCase(createComment.fulfilled, (state)=>{
        state.commentsFormLoading = false;
      })
      .addCase(createComment.rejected, (state)=>{
        state.commentsFormLoading = false;
      })
      .addCase(createPost.pending, (state)=>{
        state.postsFormLoading = true;
      })
      .addCase(createPost.fulfilled, (state)=>{
        state.postsFormLoading = false;
      })
      .addCase(createPost.rejected, (state)=>{
        state.postsFormLoading = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectPostsLoading: (state) => state.postsLoading,
    selectPost: (state) => state.onePost,
    selectPostLoading: (state) => state.onePostLoading,
    selectComments: (state) => state.comments,
    selectCommentsLoading: (state) => state.commentsLoading,
    selectCommentsFormLoading: (state)=>state.commentsFormLoading,
    selectPostFormLoading: (state)=>state.postsFormLoading,
  },
});

export const postsReducer = postsSlice.reducer;


export const { selectPosts, selectPostsLoading, selectPost, selectPostLoading, selectComments, selectCommentsLoading, selectCommentsFormLoading, selectPostFormLoading} =
  postsSlice.selectors;