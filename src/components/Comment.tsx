import React from 'react';
import { Comment } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../lib/features/postsSlice';

interface CommentProps {
  comment: Comment;
  onDelete: (commentId: number) => void;
}

const CommentComponent: React.FC<CommentProps> = ({ comment, onDelete }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h4 className="font-semibold text-blue-600">{comment.name}</h4>
        <p className="text-sm text-gray-500 mb-2">{comment.email}</p>
        <p className="text-gray-700">{comment.body}</p>
      </div>
      {isAuthenticated && user?.isAdmin && (
        <button
          onClick={() => onDelete(comment.id)}
          className="bg-red-500 text-white px-4 py-2 rounded ml-4 hover:bg-red-600"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CommentComponent;