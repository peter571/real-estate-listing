import axios from "axios";
import {
  add_to_favorite,
  check_property_in_favorites,
  get_user_favorites,
} from "./api_urls";

const getUserFavorites = async (user_id: string) => {
  return await axios.get(get_user_favorites(user_id)).then(({ data }) => data);
};

const addToFavorites = async (user_id: string, property_id: string) => {
  return await axios
    .post(add_to_favorite, { user_id, property_id })
    .then(({ data }) => data);
};

const checkPropertyIsFavorite = async (
  user_id: string,
  property_id: string
) => {
  return await axios
    .get(check_property_in_favorites(user_id, property_id))
    .then(({ data }) => data);
};

export { getUserFavorites, addToFavorites, checkPropertyIsFavorite };
