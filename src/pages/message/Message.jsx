import React from "react";
import "./Message.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useMutation } from "@tanstack/react-query";


const Message = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.put(`/messages/${message}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId:id,
      desc:e.target[0].value,
    });
    e.target[0].value="";
  }

  return (
    <div className="message">

      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages" className="link">
            MESSAGES
          </Link>{" "}
          Maya
        </span>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="messages">
            {data.map((m) => (
            <div className={m.userId === currentUser.id ? "item me" : "item"} key={m._id}>
              <img
                src="https://external-preview.redd.it/J83HNp8g0yHAqsr1kaV0lrl2OYbZ8269n_aKsYaPy_U.jpg?auto=webp&s=5e6753b795fc805a37104997a32d96431f69bbb8"
                alt=""
              />
              <p>
                {m.text}
              </p>
            </div>
            ))}               
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea
            name=""
            id=""
            placeholder="Write a message!"
           
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
