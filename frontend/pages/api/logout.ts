import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import constants from '../../util/Constants';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie: string | undefined = req.headers.cookie;
  axios
      .get(`${constants.url}/auth/logout/`, {
        headers: {
          Cookie: sessionCookie,
        },
      })
      .then((response) => {
        console.log(response.data)
        res.removeHeader('Cookie');
        res.status(200);
        res.redirect('/');
      })
      .catch((err) => {
        console.error(err);
        res.status(400);
        res.redirect('/');
      });
}

export default handler;