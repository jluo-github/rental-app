"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) {
        return;
      }

      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.log("Error fetching property: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property not found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}

      {!loading && property && (
        <>
          {/* image */}
          <PropertyHeaderImage image={property.images[0]} />

          {/* go back */}
          <section>
            <div className='container m-auto py-6 px-6'>
              <Link
                href='/properties'
                className='text-violet-500 hover:text-violet-600 flex items-center'>
                <FaArrowLeft className=' mr-2'></FaArrowLeft> Back to Properties
              </Link>
            </div>
          </section>

          {/* property details */}

          <section className='bg-violet-100'>
            <div className='container m-auto py-10 px-6'>
              <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                {/* property details */}
                <PropertyDetails property={property} />

                {/* <!-- Sidebar --> */}
                <aside className='space-y-4'>
                  {/* bookmark button */}
                  <BookmarkButton property={property} />
                  {/* share button */}
                  <ShareButtons property={property} />
                  {/* <!-- Contact Form --> */}
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>

          {/* property images */}
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};
export default PropertyPage;
