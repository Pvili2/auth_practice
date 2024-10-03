import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import FloatingShape from "./components/FloatingShape";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmail from "./pages/VerifyEmail";
import LoadingSpinner from "./components/LoadingSpinner";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
//protect protected routes
const RedirectUnAuthenticatedUser = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};
//redirect logged in users
const RedirectAuthenticatedUser = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};
function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div
      className="min-h-screen bg-gradient-to-br 
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <Routes>
        <Route
          path="/"
          element={
            <RedirectUnAuthenticatedUser>
              <DashboardPage />
            </RedirectUnAuthenticatedUser>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/verify-email"
          element={
            <RedirectUnAuthenticatedUser>
              <VerifyEmail />
            </RedirectUnAuthenticatedUser>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
