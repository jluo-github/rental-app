import Image from "next/image";

const PropertyImages = ({ images }) => {
  return (
    <section className='bg-violet-100 p-4'>
      {" "}
      <div className='container mx-auto'>
        {/* one image */}
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt='images'
            className='object-cover h-[400px] mx-auto rounded-xl'
            width={0}
            height={0}
            priority={true}
            sizes='100vw'
          />
        ) : (
          <div className='grid grid-col-2 gap-4'>
            {/* more images */}
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index === 2
                    ? "col-span-2"
                    : "col-span-1"
                }`}>
                <Image
                  src={images[0]}
                  alt='images'
                  className='object-cover h-[400px] w-full rounded-xl'
                  width={0}
                  height={0}
                  priority={true}
                  sizes='100vw'
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default PropertyImages;
