import postsReducer, {
    fetchPosts,
    // fetchPostById,
    // fetchCommentsByPostId,
    updatePost,
    // deletePost,
    deleteComment,
    PostsState,
  } from '../postsSlice';
  import { Post, Comment } from '../../../types';
  
  describe('postsSlice', () => {
    const initialState: PostsState = {
      posts: [],
      currentPost: null,
      comments: [],
      loading: false,
      error: null,
    };
  
    const mockPost: Post = {
      id: 1,
      userId: 1,
      title: 'Test Post',
      body: 'Test Body',
    };
  
    const mockComment: Comment = {
      id: 1,
      postId: 1,
      name: 'Test User',
      email: 'test@example.com',
      body: 'Test Comment',
    };
  
    it('should handle initial state', () => {
      expect(postsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    describe('fetchPosts', () => {
      it('should set loading to true on pending', () => {
        const action = { type: fetchPosts.pending.type };
        const state = postsReducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loading: true,
          error: null,
        });
      });
  
      it('should set posts on fulfilled', () => {
        const action = { type: fetchPosts.fulfilled.type, payload: [mockPost] };
        const state = postsReducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          posts: [mockPost],
          loading: false,
        });
      });
  
      it('should set error on rejected', () => {
        const error = 'Failed to fetch posts';
        const action = { type: fetchPosts.rejected.type, error: { message: error } };
        const state = postsReducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loading: false,
          error,
        });
      });
    });
  
    describe('updatePost', () => {
      it('should update the post', () => {
        const stateWithPost = {
          ...initialState,
          posts: [mockPost],
          currentPost: mockPost,
        };
        const updatedPost = { ...mockPost, title: 'Updated Title' };
        const action = { type: updatePost.type, payload: updatedPost };
        const state = postsReducer(stateWithPost, action);
        
        expect(state.posts[0].title).toBe('Updated Title');
        expect(state.currentPost?.title).toBe('Updated Title');
      });
    });
  
    describe('deleteComment', () => {
      it('should delete the comment', () => {
        const stateWithComment = {
          ...initialState,
          comments: [mockComment],
        };
        const action = { type: deleteComment.type, payload: mockComment.id };
        const state = postsReducer(stateWithComment, action);
        
        expect(state.comments).toEqual([]);
      });
    });
  });