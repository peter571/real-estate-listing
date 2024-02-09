import { API, APIWithToken } from "api/axiosInstance";

//Register a realtor account
const registerRealtorAccount = async (realtorDetails: RealtorAccountProps) => {
  return await APIWithToken(realtorDetails.userToken)
    .post("/realtor/register_profile", realtorDetails.realtorDetails)
    .then(({ data }) => data);
};

// Get all realtors
const getRealtors = async () => {
  return await API()
    .get("/realtors")
    .then(({ data }) => data);
};

// Get a realtor by account ID
const getRealtor = async (id: string) => {
  return await API()
    .get("/realtor/get_realtor/" + id)
    .then(({ data }) => data);
};

//Get all realtor properties
const getRealtorProperties = async (id: string, page: number) => {
  return await API()
    .get("/realtor/realtor_properties/" + id + "?page=" + page)
    .then(({ data }) => data);
};

//Get realtor by user ID
const getRealtorByUserId = async (user_id: string, accessToken: string) => {
  return await APIWithToken(accessToken)
    .get("/realtor/get_realtor_by_user_id/" + user_id)
    .then(({ data }) => data);
};

//Update realtor details
const updateRealtorDetails = async (
  realtor_id: string,
  realtorDetails: RealtorFormValues,
  accessToken: string
) => {
  return await APIWithToken(accessToken)
    .patch("/realtor/update_details/" + realtor_id, realtorDetails)
    .then(({ data }) => data);
};

//Change account status
const changeAccountStatus = async (
  realtor_id: string,
  action: ActionType,
  accessToken: string
) => {
  return await APIWithToken(accessToken)
    .patch("/realtor/account_status/" + realtor_id, { action: action })
    .then(({ data }) => data);
};

const getRealtorActiveProperties = async (
  realtor_id: string,
  accessToken: string,
  page: number
) => {
  return APIWithToken(accessToken)
    .get(
      `/realtor/active_or_paused_properties/${realtor_id}?page=${page}&status=active`
    )
    .then(({ data }) => data);
};

const getRealtorPausedProperties = async (
  realtor_id: string,
  accessToken: string,
  page: number
) => {
  return APIWithToken(accessToken)
    .get(
      `/realtor/active_or_paused_properties/${realtor_id}?page=${page}&status=paused`
    )
    .then(({ data }) => data);
};

export {
  getRealtor,
  getRealtors,
  getRealtorByUserId,
  changeAccountStatus,
  updateRealtorDetails,
  getRealtorProperties,
  registerRealtorAccount,
  getRealtorActiveProperties,
  getRealtorPausedProperties,
};
