import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import defaultImg from "assets/images/254.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkUserFollowsRealtor,
  followRealtor,
  getRealtorFollowers,
} from "api/realtor_followers";
import { useAuth } from "context/AuthContext";

export default function Realtor(props: RealtorDetails) {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  const { data: isFollowed } = useQuery({
    enabled: currentUser !== null,
    queryKey: ["follows", props.id],
    queryFn: () =>
      checkUserFollowsRealtor(
        props.id,
        currentUser.uid,
        currentUser.accessToken
      ),
  });

  const { data: realtorFollows } = useQuery({
    queryKey: ["follows", props.id],
    queryFn: () => getRealtorFollowers(props.id),
  });

  const followMutation = useMutation({
    mutationFn: () =>
      followRealtor(
        props.id,
        currentUser.uid,
        isFollowed === "True" ? "unfollow" : "follow",
        currentUser.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["follows", props.id],
      });
    },
  });

  return (
    <div className="max-w-sm">
      <Card>
        <div className="flex flex-col items-center pb-10">
          <Image src={props.profile_picture} fallbackSrc={defaultImg} />
          <h5
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
            className="mb-1 text-xl font-medium text-gray-900  overflow-hidden text-ellipsis"
          >
            {props.company_name}
          </h5>
          <span
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
            className="text-sm text-gray-500 overflow-hidden text-ellipsis"
          >
            {props.description}
          </span>

          <div className="mt-4 flex space-x-3 lg:mt-6">
            <span
              role="button"
              className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={() => {
                if (isLoggedIn) {
                  followMutation.mutate();
                } else {
                  navigate('/auth')
                }
                
              }}
            >
              {isFollowed === "True" ? "Unfollow" : "Follow"}
            </span>
            <span
              role="button"
              className="inline-flex gap-1 items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
              onClick={() => navigate("/real-estate-agents/" + props.id)}
            >
              View properties
              <HiOutlineExternalLink />
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export const Image = ({
  src,
  fallbackSrc,
}: {
  src: string;
  fallbackSrc: string;
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleImgError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className="mb-3 h-24 w-24 rounded-full shadow-lg"
      src={imgSrc}
      alt="PIC"
      onError={() => handleImgError()}
    />
  );
};
