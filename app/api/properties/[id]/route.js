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

    return Response.json(property, {
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

    // extract public id's from image url in DB
    const publicIds = property.images.map((imageUrl) => {
      const parts = imageUrl.split("/");
      return parts.at(-1).split(".").at(0);
    });

    // Delete images from Cloudinary
    if (publicIds.length > 0) {
      for (let publicId of publicIds) {
        await cloudinary.uploader.destroy("propertypulse/" + publicId);
      }
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

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    //owner: get user id from session
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id } = params;
    const { userId } = sessionUser;

    const formData = await request.formData();

    const amenities = formData.getAll("amenities");

    //  get property by id:
    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return new Response("Property not found.", { status: 404 });
    }

    // verify if the user is the owner of the property
    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // create a new propertyData object
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // update property in the database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return Response.json(updatedProperty, {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong.", { status: 500 });
  }
};
