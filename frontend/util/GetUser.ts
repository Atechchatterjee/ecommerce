import axios from 'axios';
import constants from '../util/Constants';

export const GetUser = async (email: string) => {
  try {
    const res = await axios.post(`${constants.url}/auth/getuser/`, {email});
    // const {user} = res.data;
    return Promise.resolve();
  } catch(err) {
    return Promise.reject();
  }

}