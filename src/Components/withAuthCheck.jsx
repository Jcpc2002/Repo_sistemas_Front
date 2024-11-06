import useAuthCheck from "../Components/useAuthCheck";
import ReactLoading from "react-loading";

const withAuthCheck = (WrappedComponent) => {
  return (props) => {
    const isLoading = useAuthCheck();

    if (isLoading) {
      return (
        <ReactLoading
          type="balls"
          color="#00BFFF"
          height={100}
          width={100}
        />
      ); 
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthCheck;
