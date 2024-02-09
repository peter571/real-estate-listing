import {
  APIWithToken,
} from "api/axiosInstance";

const getUserFavorites = async (user_id: string, accessToken: string, page: number) => {
  return await APIWithToken(accessToken)
    .get("/favorites/" + user_id + "?page=" + page)
    .then(({ data }) => data);
};

const addToFavorites = async (
  user_id: string,
  property_id: string,
  action: AddToFavoriteAction,
  accessToken: string
) => {
  return await APIWithToken(accessToken)
    .post("/favorites/add_to_favorites", { user_id, property_id, action })
    .then(({ data }) => data);
};

const checkPropertyIsFavorite = async (
  user_id: string,
  property_id: string,
  accessToken: string
) => {
  return await APIWithToken(accessToken)
    .get("/favorites/check_property/" + user_id + "/" + property_id)
    .then(({ data }) => data);
};

export { getUserFavorites, addToFavorites, checkPropertyIsFavorite };
