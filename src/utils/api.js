import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.server,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { data } = error.response;

      if (data && data.message) {
        throw new Error(data.message);
      }

      const text = typeof data === 'string' ? data : JSON.stringify(data);
      const jsonMatch = text.match(/\{.*\}/s);
      if (jsonMatch) {
        try {
          const errorData = JSON.parse(jsonMatch[0]);
          if (errorData.message) {
            throw new Error(errorData.message);
          }
        } catch (e) {
          if (e instanceof SyntaxError) {
            // malformed JSON, continue to fallback
          } else {
            throw e;
          }
        }
      }

      throw new Error(`Σφάλμα διακομιστή (Status: ${error.response.status})`);
    }

    if (error.request) {
      throw new Error('Σφάλμα σύνδεσης. Ελέγξτε τη σύνδεση δικτύου.');
    }

    throw error;
  },
);

export default api;
