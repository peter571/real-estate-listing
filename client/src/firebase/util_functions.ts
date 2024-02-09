import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
    deleteObject,
  } from "firebase/storage";
  import { app } from "firebaseapp/firebase";
  
  const storage = getStorage(app);
  
  export async function uploadFileToStorage(file_url: string, file_name: string) {
    const storageRef = ref(storage, file_name);
    try {
      const snapshot = await uploadString(storageRef, file_url, "data_url");
      const download_url = await getDownloadURL(snapshot.ref);
      return download_url;
    } catch (error) {}
  }

  export async function deleteFileFromStorage(file_name: string) {
    const storageRef = ref(storage, file_name)

    await deleteObject(storageRef).then(() => {
        return "Deleted successfully!"
    }).catch((err) => {
        console.log(err)
        return "An error occured!"
    })
  }