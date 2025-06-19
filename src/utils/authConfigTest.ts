/**
 * Configuration Test Utility
 * Run this to verify your Azure authentication configuration
 */

export const testAuthConfiguration = () => {
  const requiredEnvVars = [
    'VITE_AZURE_CLIENT_ID',
    'VITE_AZURE_AUTHORITY', 
    'VITE_AZURE_API_SCOPE',
    'VITE_AZURE_REDIRECT_URI',
    'VITE_API_URL'
  ];

  const missing: string[] = [];
  const issues: string[] = [];

  console.group('🔐 Azure Authentication Configuration Test');

  // Check environment variables
  requiredEnvVars.forEach(varName => {
    const value = import.meta.env[varName];
    if (!value) {
      missing.push(varName);
    } else {
      console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
      
      // Validate format
      if (varName === 'VITE_AZURE_AUTHORITY' && !value.includes('ciamlogin.com')) {
        issues.push('VITE_AZURE_AUTHORITY should contain "ciamlogin.com" for CIAM');
      }
      if (varName === 'VITE_AZURE_API_SCOPE' && !value.startsWith('api://')) {
        issues.push('VITE_AZURE_API_SCOPE should start with "api://"');
      }
      if (varName === 'VITE_AZURE_REDIRECT_URI' && !value.startsWith('http')) {
        issues.push('VITE_AZURE_REDIRECT_URI should be a valid URL');
      }
    }
  });

  // Report missing variables
  if (missing.length > 0) {
    console.error('❌ Missing environment variables:');
    missing.forEach(varName => console.error(`   - ${varName}`));
  }

  // Report configuration issues
  if (issues.length > 0) {
    console.warn('⚠️ Configuration issues:');
    issues.forEach(issue => console.warn(`   - ${issue}`));
  }

  // Test current URL matches redirect URI
  const redirectUri = import.meta.env.VITE_AZURE_REDIRECT_URI;
  const currentOrigin = window.location.origin;
  
  if (redirectUri && !redirectUri.startsWith(currentOrigin)) {
    console.warn(`⚠️ Redirect URI mismatch: configured for ${redirectUri}, running on ${currentOrigin}`);
  } else if (redirectUri) {
    console.log('✅ Redirect URI matches current origin');
  }

  // Summary
  if (missing.length === 0 && issues.length === 0) {
    console.log('🎉 Configuration looks good!');
  } else {
    console.log('❌ Please fix the issues above before proceeding');
  }

  console.groupEnd();

  return {
    isValid: missing.length === 0 && issues.length === 0,
    missing,
    issues
  };
};
