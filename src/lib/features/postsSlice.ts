import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Comment, Post } from '../../types';

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  comments: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return response.data;
  }
);

export const fetchCommentsByPostId = createAsyncThunk(
  'posts/fetchCommentsByPostId',
  async (postId: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return response.data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      if (state.currentPost?.id === action.payload.id) {
        state.currentPost = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      if (state.currentPost?.id === action.payload) {
        state.currentPost = null;
      }
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch post';
      })
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch comments';
      });
  },
});

export const { updatePost, deletePost, deleteComment } = postsSlice.actions;
export default postsSlice.reducer;