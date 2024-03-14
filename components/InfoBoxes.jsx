import InfoBox from "./InfoBox";

const infoBoxes = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            heading='Heading 1'
            backgroundColor='bg-gray-100'
            textColor='text-gray-800'
            buttonInfo={{
              link: "/",
              backgroundColor: "bg-violet-500",
              text: "Button 1",
            }}>
            text
          </InfoBox>
          
          <InfoBox
            heading='Heading 1'
            backgroundColor='bg-gray-100'
            textColor='text-gray-800'
            buttonInfo={{
              link: "/",
              backgroundColor: "bg-violet-500",
              text: "Button 1",
            }}>
            text
          </InfoBox>
        </div>
      </div>
    </section>
  );
};
export default infoBoxes;
