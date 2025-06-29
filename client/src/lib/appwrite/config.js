import { Client, Databases, Account } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APP_WRITE_PROJECT_ID,
  url: import.meta.env.VITE_APP_WRITE_URL,
  bucketId: import.meta.env.VITE_APP_WRITE_BUCKET_ID,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const databases = new Databases(client);
