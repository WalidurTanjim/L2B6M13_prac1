import dotenv from "dotenv";
import path from "path";

// dotenv
dotenv.config({ path: path.join(process.cwd(), ".env") });

// config
const config = {
     PORT: process.env.PORT,
     PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
     AUTH_SECRET: process.env.AUTH_SECRET
};

export default config;