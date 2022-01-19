import axios from 'axios';
import constants from './Constants';

// checks if the user-session exists
export const isAuthenticated = async (
  cookie: any,
  admin?: boolean
): Promise<void> => {
  try {
    let url = `${constants.url}/auth/isAuthenticated/`;

    if (admin) {
      url = `${constants.url}/auth/adminauth/`;
    }

    const res = await axios.get(url, {
      withCredentials: true,
    });

    if (res.status === 200) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('No token found'));
    }
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
