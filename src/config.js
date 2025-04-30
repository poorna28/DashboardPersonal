const config = {
    api: {
      // Use environment variable if set, otherwise fall back to local development URL
      baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3034',
      endpoints: {
        users: '/users',
        login: "/login",
        // Add other endpoints here as needed
      }
    }
  };
  
  export default config;