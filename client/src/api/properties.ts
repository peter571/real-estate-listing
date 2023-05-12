import { API, APIWithToken } from "./axiosInstance";

/**
 *
 * Properties API requests
 */

const getAllProperties = async () => {
  return await API()
    .get("/property/all_properties")
    .then(({ data }) => data);
};

const getPropertyById = async (property_id: string) => {
  return await API()
    .get("/property/" + property_id)
    .then(({ data }) => data);
};

const createNewProperty = async (propertyDetails: NewPropertyProps) => {
  return await APIWithToken(propertyDetails.userToken)
    .post(
      "/property/new_property/" + propertyDetails.realtor_id,
      propertyDetails.propertyDetails
    )
    .then(({ data }) => data);
};

const updateProperty = async (property: UpdatePropertyProps) => {
  return await APIWithToken(property.userToken)
    .patch(
      "/property/update_property/" +
        property.realtor_id +
        "/" +
        property.property_id,
      property.propertyDetails
    )
    .then(({ data }) => data);
};

const updatePropertyAvailability = async (
  realtor_id: string,
  property_id: string,
  action: ActionType,
  accessToken: string
) => {
  return await APIWithToken(accessToken)
    .patch(
      "/property/update_property_availability/" +
        realtor_id +
        "/" +
        property_id,
      {
        action: action,
      }
    )
    .then(({ data }) => data);
};

const deleteProperty = async (
  realtor_id: string,
  property_id: string,
  accessToken: string
) => {
  return await APIWithToken(accessToken)
    .delete("/property/delete_property/" + realtor_id + "/" + property_id)
    .then(({ data }) => data);
};

export {
  getAllProperties,
  getPropertyById,
  createNewProperty,
  updateProperty,
  updatePropertyAvailability,
  deleteProperty,
};
