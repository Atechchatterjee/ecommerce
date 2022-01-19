import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import constants from '../../util/Constants';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.write("hello");
  res.status(200);
}

export default handler;