import axios from "axios";
import {
  change_account_status,
  get_all_realtor_properties,
  get_all_realtors,
  get_realtor,
  get_realtor_by_user_id,
  register_realtor,
  update_realtor,
} from "./api_urls";

//Register a realtor account
const registerRealtorAccount = async (realtorDetails: Object) => {
  return await axios
    .post(register_realtor, realtorDetails)
    .then(({ data }) => data);
};

// Get all realtors
const getRealtors = async () => {
  return await axios.get(get_all_realtors).then(({ data }) => data);
};

// Get a realtor by account ID
const getRealtor = async (id: string) => {
  return await axios.get(get_realtor(id)).then(({ data }) => data);
};

//Get all realtor properties
const getRealtorProperties = async (id: string) => {
  return await axios
    .get(get_all_realtor_properties(id))
    .then(({ data }) => data);
};

//Get realtor by user ID
const getRealtorByUserId = async (user_id: string) => {
  return await axios
    .get(get_realtor_by_user_id(user_id))
    .then(({ data }) => data);
};

//Update realtor details
const updateRealtorDetails = async (
  realtor_id: string,
  realtorDetails: Object
) => {
  return await axios
    .patch(update_realtor(realtor_id), realtorDetails)
    .then(({ data }) => data);
};

//Change account status
const changeAccountStatus = async (
  realtor_id: string,
  action: ActionType 
) => {
  return await axios
    .patch(change_account_status(realtor_id), { action: action })
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
};
