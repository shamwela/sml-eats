export const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://sml-eats-api.up.railway.app'
    : 'http://localhost:2000'
