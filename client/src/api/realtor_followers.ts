import {
  API,
  APIWithToken,
} from "api/axiosInstance";

const getRealtorFollowers = async (realtor_id: string) => {
  return await API()
    .get("/realtor_followers/" + realtor_id)
    .then(({ data }) => data);
};

const followRealtor = async (
  realtor_id: string,
  user_id: string,
  action: FollowAction,
  accessToken: string
) => {
  return await APIWithToken(accessToken)
    .post("/realtor_followers/follow/" + realtor_id, {
      action: action,
      user_id,
    })
    .then(({ data }) => data);
};

const checkUserFollowsRealtor = async (
  realtor_id: string,
  user_id: string,
  accessToken: string
) => {
  return await APIWithToken(accessToken)
    .get(
      "/realtor_followers/check_user_follows_realtor/" +
        realtor_id +
        "/" +
        user_id
    )
    .then(({ data }) => data);
};

export { getRealtorFollowers, followRealtor, checkUserFollowsRealtor };
