import firebase from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { app } from "./firebase";

// Define function to upload images to Firebase Storage
// async function uploadImages(images: File[]): Promise<string[]> {
//   const storageRef = firebase.storage().ref();
//   const urls: string[] = [];

//   const storage = getStorage();

//   // Create a child reference
//   const imagesRef = ref(storage, "images");
//   // imagesRef now points to 'images'

//   // Loop through images and upload each one to Firebase Storage
//   for (const image of images) {
//     // Create a reference to the file in Firebase Storage
//     //const imageRef = storageRef.child(`images/${image.name}`);

//     const imageRef = ref(storage, `images/${image.name}`);
//     // Upload the file to Firebase Storage
//     const snapshot = await imageRef.put(image);

//     // Get the URL of the uploaded file
//     const url = await snapshot.ref.getDownloadURL();

//     // Add the URL to the array of URLs
//     urls.push(url);
//   }

//   // Return the array of URLs
//   return urls;
// }
