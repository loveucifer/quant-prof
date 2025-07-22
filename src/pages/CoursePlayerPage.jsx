import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

const CoursePlayerPage = () => {
    const { courseId, lessonId } = useParams();
    const { user, purchasedCourses, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Wait for authentication to resolve
        if (authLoading) {
            return;
        }

        // If no user, redirect to login, but remember where they came from
        if (!user) {
            navigate('/login', { state: { from: { pathname: `/course/${courseId}` } } });
            return;
        }

        const hasPurchased = purchasedCourses.includes(courseId);

        // If auth is loaded and user has NOT purchased, redirect to sales page.
        // The `purchasedCourses.length > 0` check prevents a redirect flash on initial load.
        if (!hasPurchased && !authLoading) {
             navigate(`/course/${courseId}`);
             return;
        }

        // Proceed with loading data only if user is authenticated and has purchased
        const loadPageData = async () => {
            setIsLoading(true);
            try {
                const courseRef = doc(db, "courses", courseId);
                const courseSnap = await getDoc(courseRef);

                if (courseSnap.exists()) {
                    const courseData = { id: courseSnap.id, ...courseSnap.data() };
                    setCourse(courseData);

                    // Fetch user's progress for this course
                    const progressRef = doc(db, "user_progress", `${user.uid}_${courseId}`);
                    const progressSnap = await getDoc(progressRef);
                    if (progressSnap.exists()) {
                        setCompletedLessons(progressSnap.data().completedLessons || []);
                    }

                    // Determine which lesson to display
                    const allLessons = courseData.sections?.flatMap(s => s.lessons) || [];
                    let lessonToLoad = lessonId ? allLessons.find(l => l.lessonId === lessonId) : allLessons[0];
                    
                    // If the lessonId is invalid or missing, go to the first lesson
                    if (!lessonToLoad && allLessons.length > 0) {
                        lessonToLoad = allLessons[0];
                        navigate(`/learn/${courseId}/${lessonToLoad.lessonId}`, { replace: true });
                    }

                    setCurrentLesson(lessonToLoad);
                } else {
                    navigate('/courses'); // Course doesn't exist
                }
            } catch (error) {
                console.error("Error loading page data:", error);
                navigate('/courses');
            }
            setIsLoading(false);
        };
        
        if(user && hasPurchased) {
            loadPageData();
        }

    }, [courseId, lessonId, user, authLoading, purchasedCourses, navigate]);

    const handleLessonClick = (lesson) => {
        navigate(`/learn/${courseId}/${lesson.lessonId}`);
    };

    const handleMarkAsComplete = async () => {
        if (!currentLesson || completedLessons.includes(currentLesson.lessonId)) return;
        const progressRef = doc(db, "user_progress", `${user.uid}_${courseId}`);
        try {
            await updateDoc(progressRef, { completedLessons: arrayUnion(currentLesson.lessonId) });
            setCompletedLessons(prev => [...prev, currentLesson.lessonId]);
        } catch (error) {
            // This can happen if the document doesn't exist yet, so we use setDoc with merge.
            await setDoc(progressRef, { completedLessons: arrayUnion(currentLesson.lessonId) }, { merge: true });
            setCompletedLessons(prev => [...prev, currentLesson.lessonId]);
        }
    };

    if (isLoading || authLoading) return <div className="text-center py-16 text-white">Loading Player...</div>;
    
    // This check is a fallback, but the useEffect should handle redirection.
    if (!course) return <div className="text-center py-16 text-white">Course not found or you do not have access.</div>;

    const isCurrentLessonCompleted = currentLesson && completedLessons.includes(currentLesson.lessonId);

    return (
        <MathJaxContext>
            <div className="flex flex-col md:flex-row h-[calc(100vh-68px)]">
                <aside className="w-full md:w-80 bg-gray-900 text-white flex-shrink-0 overflow-y-auto">
                    <div className="p-4 border-b border-gray-700">
                        <Link to="/courses" className="flex items-center gap-2 text-sm text-gray-400 hover:text-accent mb-4">
                            <ArrowLeftIcon className="h-4 w-4" /> Back to Courses
                        </Link>
                        <h2 className="font-bold text-lg">{course.title}</h2>
                    </div>
                    <div className="py-4">
                        {course.sections?.map((section, index) => (
                            <div key={index}>
                                <h3 className="px-4 py-2 text-sm font-semibold text-gray-400">{section.title}</h3>
                                <ul>
                                    {section.lessons?.map(lesson => (
                                        <li key={lesson.lessonId}>
                                            <button onClick={() => handleLessonClick(lesson)} className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${currentLesson?.lessonId === lesson.lessonId ? 'bg-accent/20 text-accent' : 'hover:bg-gray-800'}`}>
                                                <CheckCircleIcon className={`h-5 w-5 flex-shrink-0 ${completedLessons.includes(lesson.lessonId) ? 'text-accent' : 'text-gray-600'}`} />
                                                <span className="flex-grow">{lesson.title}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </aside>
                <main className="flex-grow bg-black p-8 overflow-y-auto">
                    {currentLesson ? (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold text-white">{currentLesson.title}</h1>
                                <button onClick={handleMarkAsComplete} disabled={isCurrentLessonCompleted} className="bg-accent text-primary font-bold py-2 px-6 rounded-full disabled:bg-gray-600 disabled:text-gray-400 transition-colors">
                                    {isCurrentLessonCompleted ? 'Completed' : 'Mark as Complete'}
                                </button>
                            </div>
                            <MathJax>
                                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                            </MathJax>
                        </div>
                    ) : ( <div className="text-center text-gray-400">Select a lesson to get started.</div> )}
                </main>
            </div>
        </MathJaxContext>
    );
};

export default CoursePlayerPage;
