// src/AppRouter.tsx or src/routes/index.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './src/components/dataprovider/AuthContext';
import ProtectedRoute from './src/components/ProtectedRoute';
import PublicOnlyRoute from './src/components/PublicOnlyRoute';

import LandingPage from './src/pages/Landing/Landing';
import LoginPage from './src/pages/login/Login';
import DashboardPage from './src/pages/dashboard/DashboardPage';
import SignUp from './src/pages/signup/SignUp';
import PlaylistDetailPage from './src/components/PlaylistDetailPage';


export default function AppRouter() {
  return (
    <AuthProvider>

      <Routes>
        {/* Public route */}
        <Route path="/" element={<LandingPage />} />

        {/* Redirect logged-in users from login */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignUp />
            </PublicOnlyRoute>
          }
        />


        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="/playlist/:playlistId" element={<PlaylistDetailPage />} />

        {/* 404 fallback */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

    </AuthProvider>
  );
}
