import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const client = new Redis(process.env.REDIS);
export default client;
