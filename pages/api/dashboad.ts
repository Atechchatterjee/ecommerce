import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import constants from '../../util/Constants';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie: string | undefined = req.headers.cookie;
  axios.get(`${constants.url}/auth/dashboard/`, {
        headers: {
          Cookie: sessionCookie,
        },
  }).then((response) => {
    // console.log(response.data);
    res.send(200);
  }).catch((err) => {
    console.error(err);
    res.send(400);
  })
}

export default handler;