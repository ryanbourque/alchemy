import React, { createContext, useEffect, useState } from 'react';
import { 
  PublicClientApplication, 
  AccountInfo, 
  SilentRequest 
} from '@azure/msal-browser';
import { msalConfig, tokenRequest } from '../config/authConfig';

interface AuthContextType {
  isAuthenticated: boolean;
  user: AccountInfo | null;
  accessToken: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AccountInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize MSAL and check for existing authentication
  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await msalInstance.initialize();
        
        // Handle redirect response (if coming back from redirect flow)
        const response = await msalInstance.handleRedirectPromise();
        if (response) {
          setUser(response.account);
          setAccessToken(response.accessToken);
          setIsAuthenticated(true);
        } else {
          // Check if user is already signed in
          const accounts = msalInstance.getAllAccounts();
          if (accounts.length > 0) {
            setUser(accounts[0]);
            setIsAuthenticated(true);
            // Try to get a token silently
            await getAccessTokenSilently(accounts[0]);
          }
        }
      } catch (error) {
        console.error('MSAL initialization error:', error);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeMsal();
  }, []);

  const getAccessTokenSilently = async (account: AccountInfo): Promise<string | null> => {
    try {
      const silentRequest: SilentRequest = {
        ...tokenRequest,
        account: account,
      };

      const response = await msalInstance.acquireTokenSilent(silentRequest);
      setAccessToken(response.accessToken);
      return response.accessToken;
    } catch (error) {
      console.error('Silent token acquisition failed:', error);
      // If silent token acquisition fails, we might need to interact with the user
      return null;
    }
  };

  const login = async (): Promise<void> => {
    try {      setError(null);
      setLoading(true);

      // Use redirect login as fallback for configuration issues
      await msalInstance.loginRedirect({
        scopes: ['openid', 'profile', 'email', ...tokenRequest.scopes],
        prompt: 'select_account',
      });

      // Note: After redirect, the page will reload and auth state will be handled in useEffect} catch (error: unknown) {
      console.error('Login error:', error);
      const authError = error as { errorCode?: string; errorMessage?: string };
      if (authError.errorCode === 'user_cancelled') {
        setError('Login was cancelled');
      } else {
        setError(`Login failed: ${authError.errorMessage || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Clear local state
      setUser(null);
      setAccessToken(null);
      setIsAuthenticated(false);
      setError(null);      // Logout from MSAL
      await msalInstance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin,
      });} catch (error: unknown) {
      console.error('Logout error:', error);
      const authError = error as { errorMessage?: string };
      setError(`Logout failed: ${authError.errorMessage || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const getAccessToken = async (): Promise<string | null> => {
    if (!user) {
      return null;
    }

    // If we already have a valid token, return it
    if (accessToken) {
      return accessToken;
    }

    // Try to get token silently
    try {
      const token = await getAccessTokenSilently(user);
      return token;
    } catch (error) {
      console.error('Failed to get access token:', error);
        // If silent acquisition fails, try interactive login
      try {
        await msalInstance.acquireTokenRedirect({
          ...tokenRequest,
          account: user,
        });
        // Note: After redirect, the page will reload
        return null;
      } catch (interactiveError) {
        console.error('Interactive token acquisition failed:', interactiveError);
        setError('Failed to get access token');
        return null;
      }
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    accessToken,
    login,
    logout,
    getAccessToken,
    loading,
    error,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the context for use in the custom hook
export { AuthContext };
