import { API, APIWithToken } from "api/axiosInstance";

/**
 *
 * Properties API requests
 */

const getAllProperties = async (page: number) => {
  return await API()
    .get("/property/all_properties?page=" + page)
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

const searchProperties = async (values: SearchProps, page: number) => {
  return await API()
    .get(
      `/property/search_properties?search_term=${values.search_term}&property_type=${values.type}&min_price=${values.min_price}&max_price=${values.max_price}&bedrooms=${values.beds}&bathrooms=${values.baths}&category=${values.category}&page=${page}&max_area=${values.area_max}`
    )
    .then(({ data }) => data);
};

const recentlyAddedProperties = async () => {
  return API().get('/property/recently_added').then(({ data }) => data)
}

export {
  getAllProperties,
  getPropertyById,
  createNewProperty,
  updateProperty,
  updatePropertyAvailability,
  deleteProperty,
  searchProperties,
  recentlyAddedProperties
};
