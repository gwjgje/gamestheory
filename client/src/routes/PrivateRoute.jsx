import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
     const token = sessionStorage.getItem("TOKEN");

     if (token) return children;
     else return <Navigate to='/auth' />;
}

export default PrivateRoute;