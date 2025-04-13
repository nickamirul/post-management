import { configureStore } from '@reduxjs/toolkit';
import postsReducer, {
    fetchPosts,
    fetchPostById,
    fetchCommentsByPostId,
    deleteComment,
    removeComment,
    updatePost,
    deletePost,
} from '../postsSlice';
import { Post, Comment } from '../../../types';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

interface RootState {
  posts: {
    posts: Post[];
    currentPost: Post | null;
    comments: Comment[];
    loading: boolean;
    error: string | null;
  };
}

describe('postsSlice', () => {
  let store: ReturnType<typeof configureStore<RootState>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: postsReducer,
      },
    });
    jest.clearAllMocks();
  });

  const initialState = {
    posts: [],
    currentPost: null,
    comments: [],
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(postsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchPosts', () => {
    it('handles successful fetch', async () => {
      const mockPosts: Post[] = [{ id: 1, title: 'Test Post', body: 'Test Body', userId: 1 }];
      mockedAxios.get.mockResolvedValueOnce({ data: mockPosts });

      await store.dispatch(fetchPosts());

      const state = store.getState().posts;
      expect(state.posts).toEqual(mockPosts);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('handles fetch error', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(fetchPosts());

      const state = store.getState().posts;
      expect(state.posts).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('fetchPostById', () => {
    it('handles successful fetch', async () => {
      const mockPost: Post = { id: 1, title: 'Test Post', body: 'Test Body', userId: 1 };
      mockedAxios.get.mockResolvedValueOnce({ data: mockPost });

      await store.dispatch(fetchPostById(1));

      const state = store.getState().posts;
      expect(state.currentPost).toEqual(mockPost);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('handles fetch error', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(fetchPostById(1));

      const state = store.getState().posts;
      expect(state.currentPost).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('fetchCommentsByPostId', () => {
    it('handles successful fetch', async () => {
      const mockComments: Comment[] = [{ id: 1, postId: 1, name: 'Test User', email: 'test@example.com', body: 'Test Comment' }];
      mockedAxios.get.mockResolvedValueOnce({ data: mockComments });

      await store.dispatch(fetchCommentsByPostId(1));

      const state = store.getState().posts;
      expect(state.comments).toEqual(mockComments);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('handles fetch error', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(fetchCommentsByPostId(1));

      const state = store.getState().posts;
      expect(state.comments).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('deleteComment', () => {
    it('handles successful deletion', async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      await store.dispatch(deleteComment(1));

      const state = store.getState().posts;
      expect(state.error).toBeNull();
    });

    it('handles deletion error', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.delete.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(deleteComment(1));

      const state = store.getState().posts;
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('removeComment', () => {
    it('handles successful removal', async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      await store.dispatch(removeComment(1));

      const state = store.getState().posts;
      expect(state.error).toBeNull();
    });

    it('handles removal error', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.delete.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(removeComment(1));

      const state = store.getState().posts;
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('updatePost', () => {
    it('updates post in state', () => {
      const initialPost: Post = { id: 1, title: 'Initial', body: 'Initial Body', userId: 1 };
      const updatedPost: Post = { id: 1, title: 'Updated', body: 'Updated Body', userId: 1 };

      store.dispatch(updatePost(initialPost));
      store.dispatch(updatePost(updatedPost));

      const state = store.getState().posts;
      expect(state.posts).toContainEqual(updatedPost);
    });
  });

  describe('deletePost', () => {
    it('removes post from state', () => {
      const post: Post = { id: 1, title: 'Test', body: 'Test Body', userId: 1 };

      store.dispatch(updatePost(post));
      store.dispatch(deletePost(1));

      const state = store.getState().posts;
      expect(state.posts).not.toContainEqual(post);
    });
  });
});