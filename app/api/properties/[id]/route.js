import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// get /api/properties/:id
export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connectDB();

    const property = await Property.findById(id);

    if (!property) {
      return new Response("Property not found.", { status: 404 });
    }

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong!", { status: 500 });
  }
};

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;
    const sessionUser = await getSessionUser(request);

    // check if user is logged in
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // get user id from session
    const { userId } = sessionUser;
    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) {
      return new Response("Property not found.", { status: 404 });
    }

    // check if user is the owner of the property
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // delete property
    await property.deleteOne();
    return new Response("Property Deleted.", {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong!", { status: 500 });
  }
};
