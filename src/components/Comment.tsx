import { Comment } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../lib/features/postsSlice';

interface CommentProps {
  comment: Comment;
  onDelete: (commentId: number) => void;
}

const CommentComponent = ({ comment, onDelete }: CommentProps) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-blue-600">{comment.name}</h4>
          <p className="text-sm text-gray-500 mb-2">{comment.email}</p>
          <p className="text-gray-700">{comment.body}</p>
        </div>
        {isAuthenticated && user?.isAdmin && (
          <button
            onClick={() => onDelete(comment.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentComponent;