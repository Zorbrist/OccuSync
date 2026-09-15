import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import RegisterBusiness from "./pages/RegisterBusiness";
import RegisterCustomer from "./pages/RegisterCustomer";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";

// Dashboard Pages
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
// import UserManagementPage from './pages/Admin/UserManagementPage';
// Business Pages
import BusinessPage from './pages/Business/BusinessPage';
import ListingsPage from './pages/Business/ListingsPage';
import ListingDetailsPage from './pages/Business/ListingDetailsPage';
import QuotationsPage from './pages/Business/QuotationsPage';
import CustomerOrdersPage from './pages/Business/CustOrdersPage';
import CustomerOrdersDetailsPage from './pages/Business/CustOrdersDetailsPage';
import NotificationsPage from './pages/Business/NotificationsPage';
import MerchantSupportPage from './pages/Business/MerchantSupportPage';
import StaffInvitePage from './pages/Business/StaffPage';
import InquiriesPage from './pages/Business/InquiriesPage';
import OrderProposalPage from './pages/Business/OrderProposalPage';

// Business Layout
import BusinessLayout from "./pages/Business/Business_Layout";
import CustomerLayout from "./pages/Customer/CustomerLayout";

// Import all Customer Pages
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import CustomerServices from "./pages/Customer/CustomerServices";
import CustomerInquiries from "./pages/Customer/CustomerInquiries";
import CustomerOrder from "./pages/Customer/CustomerOrder";
import CustomerCompare from "./pages/Customer/CustomerCompare";
import CustomerSave from "./pages/Customer/CustomerSave";
import CustomerNotification from "./pages/Customer/CustomerNotification";
import CustomerInvoices from "./pages/Customer/CustomerInvoices";
import CustomerPayment from './pages/Customer/CustomerPayment';

import ProtectedRoute from "./routes/ProtetedRoutes";
import AdminLayout from './pages/Admin/AdminLayout';
import StaffRegisterPage from './pages/StaffRegisterPage';

import StaffLayout from './pages/Business/Staff_Layout';
import UsersManagementPage from './pages/Admin/UserManagementPage';
import AdminServicesPage from './pages/Admin/AdminServicesPage';
import AdminJobsPage from './pages/Admin/AdminJobsPage';
import AdminTransactionsPage from './pages/Admin/AdminTransactionsPage';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register/business" element={<RegisterBusiness />} />
        <Route path="/register/customer" element={<RegisterCustomer />} />
        <Route path="register/staff" element={<StaffRegisterPage />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="users" element={<UsersManagementPage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="jobs" element={<AdminJobsPage />} />
            <Route path="transactions" element={<AdminTransactionsPage />} />
          </Route>
        </Route>

        <Route
          element={
            <ProtectedRoute
              allowedRoles={["BUSINESS_PROVIDER"]}
              allowedBusinessRoles={["OWNER"]}
            />
          }
        >
          <Route path="/business" element={<BusinessLayout />}>
            <Route index element={<BusinessPage />} />
            <Route path="listings" element={<ListingsPage />} />
            <Route path="listings/:id" element={<ListingDetailsPage />} />
            <Route path="quotations" element={<QuotationsPage />} />
            <Route path="orders" element={<CustomerOrdersPage />} />
            <Route path="orders/:id" element={<CustomerOrdersDetailsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="support" element={<MerchantSupportPage />} />
            <Route path="staff/invite" element={<StaffInvitePage />} />
            <Route path="inquiries" element={<InquiriesPage />} />
            <Route path="proposals/new" element={<OrderProposalPage />} />
            <Route path="staff" element={<StaffInvitePage />} />
          </Route>
        </Route>

        <Route
          element={
            <ProtectedRoute
              allowedRoles={["BUSINESS_PROVIDER"]}
              allowedBusinessRoles={["STAFF"]}
            />
          }
        >
          <Route path="/staff" element={<StaffLayout />}>
            <Route path="listings" element={<ListingsPage />} />
            <Route path="listings/:id" element={<ListingDetailsPage />} />
            <Route path="orders" element={<CustomerOrdersPage />} />
            <Route path="orders/:id" element={<CustomerOrdersDetailsPage />} />
          </Route>
        </Route>

        {/* Updated Customer Routes Block */}
        <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="services" element={<CustomerServices />} />
            <Route path="inquiries" element={<CustomerInquiries />} />
            <Route path="orders" element={<CustomerOrder />} />
            <Route path="compare" element={<CustomerCompare />} />
            <Route path="saved" element={<CustomerSave />} />
            <Route path="notifications" element={<CustomerNotification />} />
            <Route path="notifications" element={<CustomerNotification />} />
            <Route path="invoices" element={<CustomerInvoices />} />
           <Route path="/customer/invoices/:id/pay" element={<CustomerPayment />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
