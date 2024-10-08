import ClipLoader from "react-spinners/ClipLoader";

const override = `
    display: block;
    margin: 100px auto;
  `;

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color='#7c3aed'
      loading={loading}
      css={override}
      size={150}
      aria-label='spinner'
    />
  );
};
export default Spinner;
