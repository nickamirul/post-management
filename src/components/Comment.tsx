import React from 'react';
import { Comment as CommentType } from '../types';
import { useAuth } from '../hooks/useAuth';

interface CommentProps {
  comment: CommentType;
  onDelete: (commentId: number) => Promise<void>;
}

const CommentComponent = ({ comment, onDelete }: CommentProps) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{comment.name}</h4>
          <p className="text-gray-600 text-sm">{comment.email}</p>
        </div>
        {isAuthenticated && user?.isAdmin && (
          <button
            onClick={() => onDelete(comment.id)}
            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </button>
        )}
      </div>
      <p className="mt-2 text-gray-700">{comment.body}</p>
    </div>
  );
};

export default CommentComponent;