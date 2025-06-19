# Azure Authentication Setup Guide

This guide explains how to configure Azure Entra External ID (CIAM) authentication for your React application to work with your Azure Function App.

## Overview

The application now uses Microsoft Entra External ID (formerly Azure AD B2C) for customer identity and access management (CIAM). This setup allows for secure authentication with invitation-only access, where users must be manually created by administrators.

## Prerequisites

1. **Azure Entra External ID (CIAM) Tenant** - Already configured
2. **Azure Function App** - Deployed in your workforce tenant with authentication configured
3. **App Registrations** - SPA and API registrations in your CIAM tenant

## Environment Configuration

Update your `.env` file with the following values:

```bash
# API Configuration
VITE_API_URL=https://your-function-app.azurewebsites.net

# Azure Entra External ID (CIAM) Configuration
VITE_AZURE_CLIENT_ID=your-spa-client-id-from-ciam-tenant
VITE_AZURE_AUTHORITY=https://your-ciam-tenant-name.ciamlogin.com/your-ciam-tenant-name.onmicrosoft.com/v2.0
VITE_AZURE_API_SCOPE=api://your-api-client-id/user_impersonation
VITE_AZURE_REDIRECT_URI=https://your-deployed-spa-url.azurestaticapps.net
```

### How to Find These Values

1. **VITE_AZURE_CLIENT_ID**: 
   - Go to your CIAM tenant in Azure Portal
   - Navigate to "App registrations"
   - Find your SPA app registration
   - Copy the "Application (client) ID"

2. **VITE_AZURE_AUTHORITY**:
   - Replace `your-ciam-tenant-name` with your actual CIAM tenant name
   - Format: `https://[tenant-name].ciamlogin.com/[tenant-name].onmicrosoft.com/v2.0`

3. **VITE_AZURE_API_SCOPE**:
   - Go to your API app registration in CIAM tenant
   - Navigate to "Expose an API"
   - Copy the scope in format: `api://[api-client-id]/user_impersonation`

4. **VITE_AZURE_REDIRECT_URI**:
   - For local development: `http://localhost:5173`
   - For production: Your deployed SPA URL

## Authentication Flow

The application implements the following authentication flow:

1. **User visits the application**
2. **AuthGuard component checks authentication status**
3. **If not authenticated, user sees sign-in prompt**
4. **User clicks "Sign In with Microsoft"**
5. **MSAL redirects to Entra External ID**
6. **User signs in (invitation-only, no self-registration)**
7. **After successful authentication, user is redirected back**
8. **Access token is obtained for API calls**
9. **All API requests include the Bearer token**

## Key Components

### 1. Authentication Context (`src/contexts/AuthContext.tsx`)
- Manages authentication state across the application
- Handles login, logout, and token refresh
- Uses MSAL.js for secure authentication

### 2. AuthGuard (`src/components/AuthGuard.tsx`)
- Protects routes requiring authentication
- Shows loading states and login prompts
- Handles authentication errors gracefully

### 3. Authenticated API Service (`src/services/authenticatedApiService.ts`)
- Automatically includes Bearer tokens in API requests
- Handles authentication errors (401, 403)
- Provides type-safe HTTP methods

### 4. Account Badge (`src/components/AccountBadge.tsx`)
- Shows current user information
- Provides logout functionality
- Displays authentication errors

## API Integration

The application automatically includes the Bearer token in all API requests to your Azure Function App. The Function App validates these tokens against your CIAM tenant.

### Example API Call
```typescript
// The authenticated API service automatically handles tokens
const accounts = await fetchAccounts(1, 10, '', 'name', 'asc');
```

### Function App Configuration
Your Azure Function App should be configured with:
- **Authentication provider**: Custom (pointing to your CIAM tenant)
- **Issuer URL**: `https://your-ciam-tenant-name.ciamlogin.com/your-ciam-tenant-name.onmicrosoft.com/v2.0`
- **Client ID**: Your API app registration client ID
- **CORS**: Allow your SPA's origin

## Error Handling

The application handles various authentication scenarios:

- **Token expiration**: Automatically attempts silent refresh
- **Authentication failures**: Shows user-friendly error messages
- **Network errors**: Provides retry options
- **Permission errors**: Displays appropriate access denied messages

## Security Features

1. **Invitation-only access**: Users must be manually created in CIAM tenant
2. **Secure token handling**: Tokens stored in sessionStorage (configurable)
3. **CORS protection**: Function App only accepts requests from authorized origins
4. **Token validation**: Function App validates all incoming tokens
5. **Least privilege**: Tokens only include necessary scopes

## Development vs Production

### Local Development
- Use `http://localhost:5173` for redirect URI
- Token storage in sessionStorage for easier debugging
- Additional logging enabled

### Production
- Use HTTPS redirect URI
- Consider localStorage for persistent sessions if desired
- Reduced logging for security

## Troubleshooting

### Common Issues

1. **"Authentication failed" error**
   - Check if user exists in CIAM tenant
   - Verify redirect URI matches exactly
   - Ensure app registration is configured correctly

2. **"Access token not available" error**
   - Check API scope configuration
   - Verify API permissions are granted
   - Ensure admin consent is provided

3. **CORS errors**
   - Verify Function App CORS settings
   - Check if SPA origin is listed in allowed origins

4. **"Token validation failed" on Function App**
   - Verify Function App authentication configuration
   - Check issuer URL matches CIAM tenant
   - Ensure API client ID is correct

### Debug Steps

1. **Check browser developer tools**:
   - Network tab for failed requests
   - Console for authentication errors
   - Application tab for stored tokens

2. **Verify environment variables**:
   - Ensure all required variables are set
   - Check for typos in URLs and IDs

3. **Test authentication flow**:
   - Clear browser cache and storage
   - Try authentication in incognito mode
   - Check if sign-in popup appears

## User Management

Since this is an invitation-only system:

1. **Adding users**: Must be done through CIAM tenant admin portal
2. **User roles**: Managed through Azure RBAC or custom claims
3. **Access control**: Handled by Function App based on token validation

## Next Steps

1. **Configure your environment variables** with actual values
2. **Test the authentication flow** in development
3. **Deploy to production** with production URLs
4. **Add users** to your CIAM tenant as needed
5. **Monitor authentication** through Azure logs and metrics

The application is now ready to work with your Azure Entra External ID authentication setup!
