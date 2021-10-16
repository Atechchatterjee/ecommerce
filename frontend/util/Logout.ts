import axios from 'axios';
import constants from './Constants';

interface Props {
  admin: boolean;
}

const logout = ({admin}: Props = {admin: false}) => {
  const sessionCookie: string | undefined = document.cookie;
  const url = !admin ? `${constants.url}/auth/logout/`:`${constants.url}/auth/adminlogout/`;

  axios
    .get(url, {
      headers: {
        Cookie: sessionCookie,
      },
    })
    .then((response) => {
      console.log(response.data);
      if(admin) {
        window.location.assign("/admin/login");
      } else {
        window.location.assign("/login");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export default logout;