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
export const get_all_properties = api_url + "/property/all_properties";

export const get_property_by_id = (property_id: string) =>
  api_url + "/property/" + property_id;

export const create_new_property = (realtor_id: string) =>
  api_url + "/property/new_property/" + realtor_id;

export const update_property = (realtor_id: string, property_id: string) =>
  api_url + "/property/update_property/" + realtor_id + "/" + property_id;

export const update_property_availability = (
  realtor_id: string,
  property_id: string
) =>
  api_url +
  "/property/update_property_availability/" +
  realtor_id +
  "/" +
  property_id;

export const delete_property = (realtor_id: string, property_id: string) =>
  api_url + "/property/delete_property/" + realtor_id + "/" + property_id;

// Realtor followers
export const get_realtor_followers = (realtor_id: string) =>
  api_url + "/realtor_followers/" + realtor_id;

export const follow_realtor = (realtor_id: string) =>
  api_url + "/realtor_followers/follow/" + realtor_id;
