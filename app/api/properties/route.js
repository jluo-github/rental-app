import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();
    const page = request.nextUrl.searchParams.get("page") || 1;
    // todo: add pagination
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 6;

    const skip = (page - 1) * pageSize;
    const total = await Property.countDocuments({});

    const properties = await Property.find({}).skip(skip).limit(pageSize);

    const result = {
      total,
      properties,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong!", { status: 500 });
  }
};

// POST /api/properties
export const POST = async (request) => {
  try {
    await connectDB();

    //owner: get user id from session
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

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
      // images,
    };

    // upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // convert image to base64
      const imageBase64 = imageData.toString("base64");

      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "property" }
      );
      imageUploadPromises.push(result.secure_url);

      // wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);

      // add images to propertyData
      propertyData.images = uploadedImages;
    }

    // console.log(propertyData);
    const newProperty = new Property(propertyData);
    await newProperty.save();
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );

    // return new Response(JSON.stringify({ message: "Hello" }), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong.", { status: 500 });
  }
};
