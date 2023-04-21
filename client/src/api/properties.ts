import axios from "axios";
//import api urls
import {
  create_new_property,
  delete_property,
  get_all_properties,
  get_property_by_id,
  update_property,
  update_property_availability,
} from "./api_urls";

/**
 *
 * Properties API requests
 */

const getAllProperties = async () => {
  return await axios.get(get_all_properties).then(({ data }) => data);
};

const getPropertyById = async (property_id: string) => {
  return await axios
    .get(get_property_by_id(property_id))
    .then(({ data }) => data);
};

const createNewProperty = async (propertyDetails: NewPropertyProps) => {
  return await axios
    .post(
      create_new_property(propertyDetails.realtor_id),
      propertyDetails.propertyDetails
    )
    .then(({ data }) => data);
};

const updateProperty = async (
  realtor_id: string,
  property_id: string,
  propertyDetails: Object
) => {
  return await axios
    .patch(update_property(realtor_id, property_id), propertyDetails)
    .then(({ data }) => data);
};

const updatePropertyAvailability = async (
  realtor_id: string,
  property_id: string,
  action: ActionType
) => {
  return await axios
    .patch(update_property_availability(realtor_id, property_id), {
      action: action,
    })
    .then(({ data }) => data);
};

const deleteProperty = async (realtor_id: string, property_id: string) => {
  return await axios
    .delete(delete_property(realtor_id, property_id))
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
