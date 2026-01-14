import React from "react";
import "./Review.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => res.data),
  });

  return (
    <div className="review">
      <h2>Reviews</h2>

      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <>
          <div className="user">
            <img
              className="pp"
              src={data.img || "/img/noavatar.jpg"}
              alt=""
            />
            <div className="info">
              <span>{data.username}</span>
              <div className="country">
                <span>{data.country}</span>
              </div>
            </div>
          </div>

          <div className="stars">
            {Array(review.star)
              .fill()
              .map((_, i) => (
                <img key={i} src="/img/star.png" alt="" />
              ))}
            <span>{review.star}</span>
          </div>

          <p>{review.desc}</p>

          <div className="helpful">
            <span>Helpful?</span>
            <img src="/img/like.png" alt="" />
            <span>Yes</span>
            <img src="/img/dislike.png" alt="" />
            <span>No</span>
          </div>
        </>
      )}

      <hr />
    </div>
  );
};

export default Review;
