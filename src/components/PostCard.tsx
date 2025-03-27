import Link from 'next/link';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition cursor-pointer">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
      </div>
    </Link>
  );
};

export default PostCard;