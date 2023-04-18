export const api_url = "http://127.0.0.1:5000";

/**
 * Regsiter API URLs
 */

//Realtors
export const get_realtor_by_user_id = (user_id: string) =>
  api_url + "/realtor/get_realtor_by_user_id/" + user_id;

export const change_account_status = (realtor_id: string) =>
  api_url + "/realtor/account_status/" + realtor_id;

export const get_all_realtors = api_url + "/realtors";

export const register_realtor = api_url + "/realtor/register_profile";

export const update_realtor = (realtor_id: string) =>
  api_url + "/realtor/update_details/" + realtor_id;

export const get_realtor = (id: string) =>
  api_url + "/realtor/get_realtor/" + id;

export const get_all_realtor_properties = (realtor_id: string) =>
  api_url + "/realtor/realtor_properties/" + realtor_id;


//Properties
  