import { ID, ImageGravity } from "appwrite";
import { appwriteConfig, databases } from "./config";

export async function uploadFile(file) {
  try {
    const uploadFile = await databases.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      file,
      {
        contentType: file.type,
        name: file.name,
      }
    );

    return uploadFile;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

// get url

export async function getFileUrl(fileId) {
  try {
    const fileUrl = await databases.getFilePreview(
      appwriteConfig.bucketId,
      fileId,
      300,
      300,
      ImageGravity.Top,
      100

      // format
    );

    if (!fileUrl) {
      throw new Error("File URL not found");
    }

    return fileUrl;
  } catch (error) {
    console.error("Error getting file URL:", error);
  }
}
