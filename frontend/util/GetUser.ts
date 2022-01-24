import axios from 'axios';
import constants from '../util/Constants';

export const GetUser = async (email: string) => {
  try {
    await axios.post(`${constants.url}/auth/getuser/`, {email});
    return Promise.resolve();
  } catch(err) {
    return Promise.reject();
  }

}