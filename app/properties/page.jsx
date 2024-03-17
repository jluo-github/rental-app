import Properties from "@/components/Properties";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { fetchProperties } from "@/utils/requests";

// properties page
const PropertiesPage = async () => {
  // const properties = await fetchProperties();

  // sort properties by date created:
  // properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <section className='bg-violet-700 py-4 '>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      {<Properties />}
    </>
  );
};
export default PropertiesPage;
