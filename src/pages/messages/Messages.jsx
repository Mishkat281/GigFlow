import React from "react";
import "./Messages.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";


const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => newRequest.get(`/conversations`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  handleRead = (id) => {
    mutation.mutate(id);
  }

  return (
    <div className="messages">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((conversation) => {
                // Get the last message text safely
                const lastMessage =
                  conversation.messages?.[conversation.messages.length - 1]
                    ?.text || "";

                // Check if the conversation is unread for the current user
                const isUnread = currentUser.isSeller
                  ? !conversation.readBySeller
                  : !conversation.readByBuyer;

                return (
                  <tr
                    key={conversation.id}
                    className={isUnread ? "active" : ""}
                  >
                    <td>
                      {currentUser.isSeller
                        ? conversation.buyerId
                        : conversation.sellerId}
                    </td>
                    <td>
                      <Link className="link" to={`/message/${conversation.id}`}>
                        {lastMessage.substring(0, 100)}...
                      </Link>
                    </td>
                    <td>{new Date(conversation.updatedAt).toLocaleString()}</td>
                    <td>{isUnread ? <button>Mark as Read</button> : null}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
