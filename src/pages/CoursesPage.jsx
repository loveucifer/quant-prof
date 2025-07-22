import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

const CourseCard = ({ id, title, description, thumbnailUrl }) => (
  // FIX: This now links to the sales page route
  <Link to={`/course/${id}`}>
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 255, 106, 0.1), 0 8px 10px -6px rgba(0, 255, 106, 0.1)' }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-green-900/30 flex flex-col overflow-hidden h-full"
    >
      <div className="relative group">
        <img src={thumbnailUrl} alt={title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/000000/FFFFFF?text=Image+Not+Found'; }}/>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircleIcon className="h-16 w-16 text-accent"/>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-accent mb-3 flex-grow">{title}</h3>
          <p className="text-gray-400 mb-6 text-sm">{description}</p>
          <div className="mt-auto w-full text-center bg-accent text-primary font-bold tracking-wider text-sm py-3 px-10 rounded-md">
              View Course
          </div>
      </div>
    </motion.div>
  </Link>
);

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const coursesCollection = collection(db, 'courses');
                const courseSnapshot = await getDocs(coursesCollection);
                const courseList = courseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCourses(courseList);
            } catch (error) {
                console.error("Error fetching courses: ", error);
            }
            setLoading(false);
        };
        fetchCourses();
    }, []);

    if (loading) return <div className="text-center py-16 text-white">Loading courses...</div>;

    return (
        <div className="container mx-auto px-4 py-16">
        <h2 className="text-5xl font-bold text-center mb-12">All Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
            ))}
        </div>
        </div>
    );
};

export default CoursesPage;
