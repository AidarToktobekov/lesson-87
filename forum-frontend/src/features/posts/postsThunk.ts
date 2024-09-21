import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post , Comment} from '../../types';
import axiosApi from '../../axiosApi';

export const postsFetch = createAsyncThunk<Post[]>(
    'posts/fetchAll',
    async () => {
    const { data: posts } = await axiosApi.get<Post[]>(`/posts`);
    return posts;
  },
);

export const postFetch = createAsyncThunk<Post, string>(
  'posts/fetchOne',
  async (id) => {
  const { data: post } = await axiosApi.get<Post>(`/posts/${id}`);
  return post;
},
);

export const commentsFetch = createAsyncThunk<Comment[], string>(
  'posts/fetchComments',
  async (id) => {
  const { data: comments } = await axiosApi.get<Comment[]>(`/comments/${id}`);
  return comments;
},
);