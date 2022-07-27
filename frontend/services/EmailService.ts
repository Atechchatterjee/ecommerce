import api from "../util/AxiosApi";

interface Email {
  subject: string;
  body: string;
  code: string;
  toEmail: string;
}

export const sendEmail = async (emailBody: Email) => {
  const res = await api.post("/auth/sendemail/", { emailBody });
  if (res && res.status === 200) return Promise.resolve(res);
  else Promise.reject();
};
