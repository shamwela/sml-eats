export const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://sml-eats-server.onrender.com'
    : 'http://localhost:2000'
