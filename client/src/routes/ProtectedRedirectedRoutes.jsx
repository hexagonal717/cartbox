import { Navigate, Route } from 'react-router-dom';

const ProtectedRedirectedRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Navigate to={'/'} />} />
      <Route path="/signup" element={<Navigate to={'/'} />} />
      <Route path="/admin-login" element={<Navigate to={'/'} />} />
      <Route path="/admin-signup" element={<Navigate to={'/'} />} />
      <Route path="/forgotpassword" element={<Navigate to={'/'} />} />
      <Route path="/verifycode" element={<Navigate to={'/'} />} />
      <Route path="/changepassword" element={<Navigate to={'/'} />} />
      <Route path="/loginredirectPage" element={<Navigate to={'/'} />} />
    </>
  );
};

export default ProtectedRedirectedRoutes;
