import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post , Comment, CommentMutation} from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

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

export const createComment = createAsyncThunk<void, CommentMutation, {state: RootState}>(
  'posts/createComment',
  async (commentMutation, {getState}) => {
      const user = getState().users.user;
      if (user) {
        await axiosApi.post<Comment>('/comments', commentMutation,  {headers: {'Authorization': `Bearer ${user.token}`}});
      }
  },
);