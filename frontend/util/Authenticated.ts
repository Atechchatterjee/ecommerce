import axios from 'axios';
import constants from './Constants';

export const isAuthenticated = async (
  admin?: boolean
): Promise<void> => {
  try {
    let backendURL = `${constants.url}/auth/isAuthenticated/`;

    if (admin) {
      backendURL = `${constants.url}/auth/adminauth/`;
    }

    const res = await axios.get(backendURL, {
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
