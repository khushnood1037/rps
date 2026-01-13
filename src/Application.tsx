import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/admin/dashboard/Dashboard";
import Settings from "./components/pages/admin/Settings/Settings";
import TransactionHistory from "./components/pages/admin/transactionHistory/TransactionHistory";
import Users from "./components/pages/admin/users/Users";
import ErrorPage from "./components/pages/errorPage/ErrorPage";
import Home from "./components/pages/home/Home";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import PrivacyPolicy from "./components/pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./components/pages/TermsConditions/TermsConditions";
import AdminLayout from "./components/ui/admin/adminLayout/AdminLayout";
import EmptyLayout from "./components/ui/emptyLayout/EmptyLayout";
import Layout from "./components/ui/layout/Layout";
import AuthGuard from "./guards/AuthGuard";
const Application = () => {
  return (
    <Routes>
      <Route element={<EmptyLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route>
        <Route
          path="login"
          element={
              <LoginPage />
          }
        />
      </Route>
      <Route element={<Layout />}>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
      </Route>
      <Route
        path="/admin"
        element={
          <AuthGuard>
            <AdminLayout />
          </AuthGuard>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transaction-history" element={<TransactionHistory />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
export default Application;
