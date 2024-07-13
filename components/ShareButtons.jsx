import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  RedditIcon,
  EmailIcon,
} from "react-share";

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className='text-xl font-bold text-center pt-2'>
        Share This Property:
      </h3>
      <div className='flex gap-3 justify-center pb-5'>
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}>
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <RedditShareButton url={shareUrl} title={property.name}>
          <RedditIcon size={40} round={true} />
        </RedditShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property listing: ${shareUrl}`}>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};
export default ShareButtons;

{
  /* // <button className='bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'> */
}
{
  /* //   <TwitterIcon size={32} round={true} />
      <FaShare className=' mr-2'></FaShare> Share
    </button> */
}
