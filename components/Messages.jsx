"use client";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("/api/messages");

        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.log("Error fetching messages: ", error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  return loading ? (
    <Spinner loading={loading}></Spinner>
  ) : (
    <section className='bg-violet-100'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-violet-200 px-6 py-8 mb-4 shadow-2xl rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>
          {/* <Message /> */}

          <div className='space-y-4'>
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <Message key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Messages;
