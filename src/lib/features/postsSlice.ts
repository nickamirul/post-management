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

export const deleteComment = createAsyncThunk(
  'posts/deleteComment',
  async (commentId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
      return commentId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete comment');
    }
  }
);

export const removeComment = createAsyncThunk(
  'posts/removeComment',
  async (commentId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
      return commentId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to remove comment');
    }
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
      } else {
        state.posts.push(action.payload);
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
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
        state.error = null;
      })
      .addCase(removeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;