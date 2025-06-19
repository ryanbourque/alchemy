import { Configuration, PopupRequest } from '@azure/msal-browser';

// MSAL configuration for Azure Entra External ID (CIAM)
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || '',
    authority: import.meta.env.VITE_AZURE_AUTHORITY || '',
    redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI || window.location.origin,
    knownAuthorities: [
      // Add your CIAM domain to prevent token phishing
      new URL(import.meta.env.VITE_AZURE_AUTHORITY || '').hostname
    ],
  },
  cache: {
    cacheLocation: 'sessionStorage', // Can be 'localStorage' for persistent login
    storeAuthStateInCookie: false, // Set to true for IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0: // LogLevel.Error
            console.error(message);
            return;
          case 1: // LogLevel.Warning
            console.warn(message);
            return;
          case 2: // LogLevel.Info
            console.info(message);
            return;
          case 3: // LogLevel.Verbose
            console.debug(message);
            return;
        }
      },
    },
  },
};

// Scopes for API access
export const apiScopes: string[] = [
  import.meta.env.VITE_AZURE_API_SCOPE || '',
];

// Login request configuration
export const loginRequest: PopupRequest = {
  scopes: ['openid', 'profile', 'email', ...apiScopes],
  prompt: 'select_account',
};

// Silent token request for API calls
export const tokenRequest = {
  scopes: apiScopes,
  forceRefresh: false, // Set to true to skip cache and force token refresh
};
