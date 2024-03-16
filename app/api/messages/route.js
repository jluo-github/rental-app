import connectDB from "@/config/database";
import Message from "@/models/Message";

import { getSessionUser } from "@/utils/getSessionUser";
export const dynamic = "force-dynamic";

// GET /api/messages
export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("User ID is required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) // Sort read messages in asc order
      .populate("sender", "username")
      .populate("property", "name");

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 }) // Sort read messages in asc order
      .populate("sender", "username")
      .populate("property", "name");

    const messages = [...unreadMessages, ...readMessages];

    return Response.json(messages);
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();
    const { name, email, phone, message, property, recipient } =
      await request.json();

    // check session User:
    const sessionUser = await getSessionUser(request);
    if (!sessionUser || !sessionUser.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    // get user:
    const { user } = sessionUser;

    // cannot send message to self
    // if (user._id === recipient) {
    //   return new Response(
    //     (JSON.stringify({ message: "Cannot send message to yourself." }),
    //     { status: 400 })
    //   );
    // }

    const newMessage = new Message({
      name,
      sender: user._id,
      recipient,
      property,
      email,
      phone,
      body: message,
    });

    await newMessage.save();
    return new Response(
      JSON.stringify({ message: "Message sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
