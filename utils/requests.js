const url = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// http://localhost:3000/api

// fetch properties
async function fetchProperties({ is_featured = false } = {}) {
  try {
    // if domain is not set:
    if (!url) {
      return [];
    }

    const res = await fetch(
      `${url}/properties${is_featured ? "/featured" : ""}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

// fetch property by id
async function fetchProperty(id) {
  try {
    // if domain is not set:
    if (!url) {
      return null;
    }

    const res = await fetch(`${url}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
