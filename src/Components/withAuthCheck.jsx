import useAuthCheck from "../Components/useAuthCheck"

const withAuthCheck = (WrappedComponent) => {
    return (props) => {
      useAuthCheck();
      return <WrappedComponent {...props} />;
    };
  };

export default withAuthCheck;