import Link from 'next/link';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition cursor-pointer w-full h-56 relative">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
        <button 
          className="absolute bottom-4 right-4 text-blue-500 hover:text-blue-600" 
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          See post
        </button>
      </div>
    </Link>
  );
};

export default PostCard;