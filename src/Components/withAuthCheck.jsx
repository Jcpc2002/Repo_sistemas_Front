import useAuthCheck from "../Components/useAuthCheck";

const withAuthCheck = (WrappedComponent) => {
  return (props) => {
    const isLoading = useAuthCheck();

    if (isLoading) {
      return <div>Loading...</div>; // Puedes mostrar un indicador de carga personalizado
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthCheck;