import dotenv from "dotenv";
import path from "path";

// dotenv
dotenv.config({ path: path.join(process.cwd(), ".env") });

// config
const config = {
     port: process.env.PORT
};

export default config;