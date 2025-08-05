import { Navigate } from "react-router-dom";

function ProtectedRoute({children}) {

    if(!localStorage.getItem('tkn')){
        return <Navigate to='/login' />
    }

    return ( <>
    {children}
    </> );
}

export default ProtectedRoute;