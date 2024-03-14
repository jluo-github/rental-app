const url = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// http://localhost:3000/api

// fetch properties
async function fetchProperties() {
  try {
    // if domain is not set:
    if (!url) {
      throw new Error("Failed to fetch properties. Domain not set.");
    }

    const res = await fetch(`${url}/properties`);
    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const data = await res.json();
    return data;
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
