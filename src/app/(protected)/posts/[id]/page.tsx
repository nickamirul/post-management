'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../lib/store';
import {
  fetchPostById,
  fetchCommentsByPostId,
  updatePost,
  deletePost,
  removeComment,
} from '../../../../lib/features/postsSlice';
import CommentComponent from '../../../../components/Comment';
import { useAuth } from '../../../../hooks/useAuth';
import Notification from '../../../../components/Notification';

export default function PostDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost, comments, loading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    dispatch(fetchPostById(Number(id)));
    dispatch(fetchCommentsByPostId(Number(id)));
  }, [dispatch, id, isAuthenticated, router, authLoading]);

  useEffect(() => {
    if (currentPost) {
      setEditedTitle(currentPost.title);
    }
  }, [currentPost]);

  const handleUpdatePost = () => {
    if (currentPost) {
      try {
        dispatch(
          updatePost({
            ...currentPost,
            title: editedTitle,
          })
        );
        setIsEditing(false);
        setNotification('Post updated successfully!');
      } catch (err) {
        console.error('Error updating post:', err);
        setNotification('Failed to update post. Please try again.');
      }
    }
  };

  const handleDeletePost = () => {
    if (currentPost) {
      try {
        dispatch(deletePost(currentPost.id));
        setNotification('Post deleted successfully!');
        router.push('/posts');
      } catch (err) {
        console.error('Error deleting post:', err);
        setNotification('Failed to delete post. Please try again.');
      }
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await dispatch(removeComment(commentId)).unwrap();
      setNotification('Comment deleted successfully!');
    } catch (err) {
      console.error('Error deleting comment:', err);
      setNotification('Failed to delete comment. Please try again.');
    }
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
    setShowEditDeleteButtons(false);
  };

  const handleSaveButtonClick = () => {
    handleUpdatePost();
    setShowEditDeleteButtons(true);
  };

  const handleCancelButtonClick = () => {
    setIsEditing(false);
    setShowEditDeleteButtons(true);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        closeNotification();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  console.log('Current notification state:', notification);

  if (loading && !currentPost) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentPost) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {notification && (
        <Notification message={notification} onClose={closeNotification} />
      )}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {isEditing ? (
          <div className="mb-4">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <button
              onClick={handleSaveButtonClick}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancelButtonClick}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold mb-4">{currentPost.title}</h2>
          </div>
        )}
        <p className="text-gray-700">{currentPost.body}</p>
        {isAuthenticated && user?.isAdmin && showEditDeleteButtons && (
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleEditButtonClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDeletePost}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentComponent
                key={comment.id}
                comment={comment}
                onDelete={handleDeleteComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}