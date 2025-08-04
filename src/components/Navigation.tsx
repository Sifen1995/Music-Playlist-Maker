import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './dataprovider/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../utility/firebase';

const Navigation: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <nav className="container mx-auto bg-white fixed top-0 left-0 right-0  shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <h1 className="text-md md:text-xl font-bold text-amber-800"><Link to={'/'}>Musically</Link></h1>
            </div>
          <div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-4">
              {user ? (
                // User is logged in - show user info and logout
                <div className="flex items-center">
                  <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDashboard}
                    className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </button>
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-gray-700 text-sm hidden md:block mr-2">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // User is not logged in - show login/signup
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLogin}
                    className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 