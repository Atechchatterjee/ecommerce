export default {
  url:
    process.env.NEXT_PUBLIC_APP_ENV === 'production'
      ? process.env.NEXT_PUBLIC_PROD_URL
      :
       process.env.NEXT_PUBLIC_URL,
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  fallbackURL: "https://newhorizon-bsh.s3.ap-south-1.amazonaws.com/nhengineering/bsh/wp-content/uploads/2020/01/17113522/default-image.png"
};
