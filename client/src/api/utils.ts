import { API, APIWithToken } from "./axiosInstance";

// Send Email
const sendEmailToRealtor = async (
  from: string,
  to: string,
  message: string
) => {
  return API()
    .post("/send_mail", { from, to, message })
    .then(({ data }) => data);
};


//Upload Images to storage
const uploadImages = async (token: string, formData: FormData) => {
  return APIWithToken(token)
    .post(
      "/utils/upload_images",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    .then(({ data }) => data);
};

export { sendEmailToRealtor, uploadImages };
