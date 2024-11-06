import useAuthCheck from "../Components/useAuthCheck";
import ReactLoading from "react-loading";

const withAuthCheck = (WrappedComponent) => {
  return (props) => {
    const isLoading = useAuthCheck();

    if (isLoading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', 
            width: '100%',    
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <ReactLoading
            type="spin"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthCheck;
