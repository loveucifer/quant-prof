import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const CourseSalesPage = () => {
    const { courseId } = useParams();
    const { user, purchaseCourse, purchasedCourses, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEnrolling, setIsEnrolling] = useState(false);

    const hasPurchased = purchasedCourses.includes(courseId);

    // Fetch course details from Firestore
    useEffect(() => {
        const fetchCourse = async () => {
            setIsLoading(true);
            const courseRef = doc(db, "courses", courseId);
            const courseSnap = await getDoc(courseRef);
            if (courseSnap.exists()) {
                setCourse({ id: courseSnap.id, ...courseSnap.data() });
            } else {
                console.error("Course not found!");
            }
            setIsLoading(false);
        };
        fetchCourse();
    }, [courseId]);

    // Redirect to player if already purchased
    useEffect(() => {
        if (!authLoading && hasPurchased && course) {
            const firstLessonId = course.sections?.[0]?.lessons?.[0]?.lessonId || 'start';
            navigate(`/learn/${courseId}/${firstLessonId}`, { replace: true });
        }
    }, [authLoading, hasPurchased, course, courseId, navigate]);

    // Handle the enroll button click
    const handleEnroll = async () => {
        if (authLoading || isEnrolling) return;

        // If user is not logged in, redirect to login page
        if (!user) {
            navigate('/login', { state: { from: location } });
            return;
        }

        setIsEnrolling(true);
        const result = await purchaseCourse(courseId);
        if (result !== 'success') {
            // Optionally, show an error message to the user
            console.error("Enrollment failed with status:", result);
        }
        // On success, the `useEffect` above will handle the redirect
        setIsEnrolling(false);
    };

    if (isLoading || authLoading) {
        return <div className="text-center py-16 text-white">Loading Course...</div>;
    }

    if (!course) {
        return <div className="text-center py-16 text-white">Course not found.</div>;
    }

    // This view is only shown if the user has NOT purchased the course
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <img src={course.thumbnailUrl} alt={course.title} className="rounded-lg shadow-lg w-full h-auto object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/000000/FFFFFF?text=Image+Not+Found'; }}/>
                </div>
                <div className="text-white">
                    <h1 className="text-4xl font-bold text-accent mb-4">{course.title}</h1>
                    <p className="text-gray-300 mb-8 text-lg">{course.description}</p>
                    <button onClick={handleEnroll} disabled={isEnrolling} className="w-full bg-accent text-primary font-bold py-3 px-8 rounded-full hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed">
                        {isEnrolling ? 'Enrolling...' : 'Enroll in Course'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseSalesPage;
