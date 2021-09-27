import axios from "axios";
import constants from './Constants';

// checks if the user-session exists
export const isAuthenticated = async (cookie: any): Promise<void> => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.get(
      `${constants.url}/auth/isAuthenticated/`, {
        headers: {
          Cookie: cookie
        }
      }
    );

    const { token } = res.data;
    
    if(token) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('No token found'));
    }
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
