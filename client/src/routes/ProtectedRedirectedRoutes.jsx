import { Navigate, Route } from 'react-router-dom';

const ProtectedRedirectedRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Navigate to={'/'} />} />
      <Route path="/signup" element={<Navigate to={'/'} />} />
      <Route path="/admin-login" element={<Navigate to={'/'} />} />
      <Route path="/admin-signup" element={<Navigate to={'/'} />} />
      <Route path="/super-admin-login" element={<Navigate to={'/'} />} />
      <Route path="/forgot-password" element={<Navigate to={'/'} />} />
      <Route path="/verify-code" element={<Navigate to={'/'} />} />
      <Route path="/change-password" element={<Navigate to={'/'} />} />
      <Route
        path="/change-password-success-redirect"
        element={<Navigate to={'/'} />}
      />
      <Route path="/payment" element={<Navigate to={'/'} />} />
      <Route path="/orders" element={<Navigate to={'/'} />} />
      {/*<Route path="/order-success" element={<Navigate to={'/'} />} />*/}
      <Route path="/settings" element={<Navigate to={'/'} />}>
        <Route path="settings/profile" element={<Navigate to={'/'} />} />
        <Route path="settings/account" element={<Navigate to={'/'} />} />
        <Route path="settings/address" element={<Navigate to={'/'} />} />
        <Route path="settings/address/add-address" element={<Navigate to={'/'} />} />
        <Route
          path="settings/address/edit-address"
          element={<Navigate to={'/'} />}
        />
      </Route>
    </>
  );
};

export default ProtectedRedirectedRoutes;
