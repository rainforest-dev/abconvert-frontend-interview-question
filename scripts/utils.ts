import { configDotenv } from "dotenv";
import * as fs from "fs";
import * as path from "path";

export const loadEnv = () => {
  configDotenv();
  configDotenv({ path: `.env.${process.env.NODE_ENV}`, override: true });
  configDotenv({ path: ".env.local", override: true });
  configDotenv({ path: `.env.${process.env.NODE_ENV}.local`, override: true });
};

export const createFolderIfNotExists = (filePath: string) => {
  const folderPath = path.dirname(filePath);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};
