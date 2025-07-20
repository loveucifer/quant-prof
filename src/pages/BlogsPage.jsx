import { Link } from 'react-router-dom';
import blogData from '../data/blogs.json';
import { motion } from 'framer-motion';

const BlogCard = ({ id, title, summary, date }) => (
    <motion.div
    whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 255, 106, 0.1), 0 8px 10px -6px rgba(0, 255, 106, 0.1)' }}
    className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-green-900/30 flex flex-col transition-all duration-300 h-full"
  >
    <p className="text-sm text-gray-400 mb-2">{date}</p>
    <h3 className="text-2xl font-bold text-accent mb-3 flex-grow">{title}</h3>
    <p className="text-gray-400 mb-4">{summary}</p>
    <Link to={`/blog/${id}`} className="text-accent font-semibold hover:underline mt-auto">Read More →</Link>
  </motion.div>
);

const BlogsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-5xl font-bold text-center mb-12">Our Blog</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {blogData.map(blog => (
            <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;