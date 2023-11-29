import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const ProtectedRouteUser = ({ element }) => {
  // Replace this with your actual authentication check
  const isAuthenticated = localStorage.getItem('token') !== null; // Check if JWT token exists
  console.log(isAuthenticated);
  return isAuthenticated ? (
      <Outlet/>
  ) : (
    <Navigate to="/userlogin" />
  );
};

export default ProtectedRouteUser;



// import React from 'react';
// import { Route, useNavigate } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const isLoggedIn = localStorage.getItem('jwt') !== null; // Check if JWT token exists
//    const navigate  = useNavigate();
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (isLoggedIn) {
//           return <Component {...props} />; // Render the protected component
//         } else {
//             navigate('/');
//         }
//       }}
//     />
//   );
// };

// export default ProtectedRoute;
