import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

// Simple Google Icon SVG
const GoogleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C41.38,36.31,44,30.651,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

const LoginPage = () => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // This is the critical part for the redirect flow.
  const from = location.state?.from?.pathname || '/courses';

  const handleLogin = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
      navigate(from, { replace: true }); // Redirect to the previous page
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      console.error(err);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700 p-8 text-center">
        <h2 className="text-3xl font-bold text-accent mb-4">Join QuantProf</h2>
        <p className="text-gray-400 mb-8">Sign in to access your courses and track your progress.</p>
        
        {error && <p className="bg-red-900 text-red-200 p-3 rounded-md mb-6">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3 px-6 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <GoogleIcon />
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
