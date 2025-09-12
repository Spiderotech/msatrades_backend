import dotenv from "dotenv";
dotenv.config();

export default {
  // Use Railway port if available, otherwise fall back
  port: process.env.PORT || 3000,

  mongo: {
    uri: process.env.MONGO_URI,
  },

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,
};
