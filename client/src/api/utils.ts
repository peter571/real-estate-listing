import { API, APIWithToken } from "api/axiosInstance";

// Send Email
const sendEmailToRealtor = async (
  full_names: string,
  email: string,
  phone_number: string | number,
  message: string,
  agent_email: string
) => {
  return API()
    .post("/utils/send_mail", {
      full_names,
      email,
      phone_number,
      agent_email,
      message,
    })
    .then(({ data }) => data);
};

//Upload Images to storage
const uploadImages = async (token: string, formData: FormData) => {
  return APIWithToken(token)
    .post("/utils/upload_images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(({ data }) => data);
};

export { sendEmailToRealtor, uploadImages };
