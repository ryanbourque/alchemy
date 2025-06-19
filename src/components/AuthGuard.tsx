import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Loader2, LogIn, AlertCircle } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard component that protects routes and ensures user is authenticated
 * Shows loading state, login prompt, or error states as needed
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, loading, error, login, user } = useAuth();

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Initializing Authentication...
          </h2>
          <p className="text-gray-600">
            Please wait while we check your authentication status.
          </p>
        </div>
      </div>
    );
  }

  // Show error state if there's an authentication error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Authentication Error
          </h2>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <button
            onClick={login}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
                <LogIn className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Sign In Required
              </h2>
              <p className="text-gray-600">
                You need to sign in to access this application. This app uses secure authentication through Microsoft Entra External ID.
              </p>
            </div>
            
            <button
              onClick={login}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Sign In with Microsoft
            </button>
            
            <div className="mt-4 text-xs text-gray-500">
              <p>By signing in, you agree to our terms of service and privacy policy.</p>
              <p className="mt-1">This is an invitation-only application.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated - show the protected content
  return (
    <div>
      {/* Optional: Show user info in development */}
      {process.env.NODE_ENV === 'development' && user && (
        <div className="bg-green-50 border-l-4 border-green-400 p-2">
          <div className="text-sm text-green-700">
            Authenticated as: {user.name || user.username} ({user.localAccountId})
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default AuthGuard;
