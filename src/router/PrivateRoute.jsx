import {useLocation, Navigate} from "react-router-dom";

export const PrivateRoute = ({children}) => {

    const {state} = useLocation();

    alert(state);

    return state?.logged ? children : <Navigate to='/login' />
}

