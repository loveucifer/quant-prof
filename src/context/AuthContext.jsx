import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  GoogleAuthProvider,
  signInWithPopup,
  signOut 
} from 'firebase/auth';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed. User:", currentUser ? currentUser.uid : null);
      setUser(currentUser);
      if (currentUser) {
        const q = query(collection(db, "user_progress"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const courses = querySnapshot.docs.map(doc => doc.data().courseId);
        setPurchasedCourses(courses);
        console.log("Fetched purchased courses:", courses);
      } else {
        setPurchasedCourses([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);
  
  const purchaseCourse = async (courseId) => {
    // CRITICAL FIX: Re-check the currently authenticated user right before writing.
    const currentUser = auth.currentUser;
    if (currentUser && !purchasedCourses.includes(courseId)) {
      console.log(`Attempting to purchase course ${courseId} for user ${currentUser.uid}`);
      const progressRef = doc(db, "user_progress", `${currentUser.uid}_${courseId}`);
      await setDoc(progressRef, {
        userId: currentUser.uid,
        courseId: courseId,
        completedLessons: []
      });
      setPurchasedCourses(prev => [...prev, courseId]);
      console.log("Course purchase successful in context.");
      return 'success';
    } else if (!currentUser) {
        console.error("Purchase failed: User is not authenticated.");
        return 'auth_required';
    } else {
        console.log("User already owns this course.");
        return 'already_owned';
    }
  };

  const value = {
    user,
    isLoggedIn: !!user,
    loading,
    purchasedCourses,
    purchaseCourse,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
