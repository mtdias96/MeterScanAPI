import 'dotenv/config';
export const env = {
  jwtSecret: process.env.JWT_SECRET!,
  API_KEY: process.env.API_KEY!
};
