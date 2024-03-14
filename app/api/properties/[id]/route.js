import connectDB from "@/config/database";
import Property from "@/models/Property";

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
