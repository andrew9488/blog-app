import React from "react";
import Moment from "react-moment";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { APP_ROUTES, postsService } from "../../shared";

const MyPostsPage = () => {
  const { data, isLoading } = useQuery(["posts"], postsService.getMyPosts, {
    initialData: {
      myPosts: [],
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data?.myPosts?.map(({ createdAt, id, title }) => {
        return (
          <div className="flex justify-center py-8" key={id}>
            <div className="w-2/3">
              <div className="flex justify-between items-center pt-2">
                <div className="text-xs text-white opacity-50">
                  <Moment date={createdAt} format="D MMM YYYY" />
                </div>
              </div>
              <Link
                to={`${APP_ROUTES.posts}/${id}`}
                className="flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <div className="text-white text-xl">{title}</div>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MyPostsPage;
