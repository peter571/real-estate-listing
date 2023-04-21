import axios from "axios";
import {
  check_user_follows_realtor,
  follow_realtor,
  get_realtor_followers,
} from "./api_urls";

const getRealtorFollowers = async (realtor_id: string) => {
  return await axios
    .get(get_realtor_followers(realtor_id))
    .then(({ data }) => data);
};

const followRealtor = async (
  realtor_id: string,
  user_id: string,
  action: FollowAction
) => {
  return await axios
    .post(follow_realtor(realtor_id), { action: action, user_id })
    .then(({ data }) => data);
};

const checkUserFollowsRealtor = async (realtor_id: string, user_id: string) => {
  return await axios
    .get(check_user_follows_realtor(realtor_id, user_id))
    .then(({ data }) => data);
};

export { getRealtorFollowers, followRealtor, checkUserFollowsRealtor };
