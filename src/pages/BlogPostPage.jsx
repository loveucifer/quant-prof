import { useParams, Link } from 'react-router-dom';
import blogData from '../data/blogs.json';
import { motion } from 'framer-motion';

const BlogPostPage = () => {
  const { id } = useParams();
  const blog = blogData.find(post => post.id === parseInt(id));

  if (!blog) {
    return <div className="text-center py-16">Blog post not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
       <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">{blog.title}</h1>
        <p className="text-gray-400 mb-8">{blog.date}</p>
        <div className="prose prose-invert lg:prose-xl max-w-none text-gray-300 leading-relaxed">
          <p>{blog.content}</p>
        </div>
        <Link to="/blogs" className="text-accent font-semibold hover:underline mt-12 inline-block">← Back to Blogs</Link>
      </motion.div>
    </div>
  );
};

export default BlogPostPage;