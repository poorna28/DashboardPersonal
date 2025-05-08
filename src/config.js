const config = {
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL || "http://localhost:3034",
    endpoints: {
      users: "/users",
      login: "/login",
      signup: "/signup", // Added signup endpoint
    },
  },
};

export default config;