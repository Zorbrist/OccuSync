import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// Public Pages
import Home from './pages/Home';
import RegisterBusiness from './pages/RegisterBusiness';
import RegisterCustomer from './pages/RegisterCustomer';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';

// Dashboard Pages
import AdminPage from './pages/AdminPage';

// Business Pages
import BusinessPage from './pages/Business/BusinessPage';
import ListingsPage from './pages/Business/ListingsPage';
import QuotationsPage from './pages/Business/QuotationsPage';
import CustomerOrdersPage from './pages/Business/CustOrdersPage';
import NotificationsPage from './pages/Business/NotificationsPage';
import MerchantSupportPage from './pages/Business/MerchantSupportPage';

// Business Layout
import Layout from './components/business_dashboard/Layout';

// Import all Customer Pages
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import CustomerServices from "./pages/Customer/CustomerServices";
import CustomerInquiries from "./pages/Customer/CustomerInquiries";
import CustomerOrder from "./pages/Customer/CustomerOrder";
import CustomerCompare from "./pages/Customer/CustomerCompare";
import CustomerSave from "./pages/Customer/CustomerSave";
import CustomerNotification from "./pages/Customer/CustomerNotification";

import ProtectedRoute from "./routes/ProtetedRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register/business" element={<RegisterBusiness />} />
        <Route path="/register/customer" element={<RegisterCustomer />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['SERVICE_PROVIDER']} />}>
          <Route path="/business" element={<Layout />}>
            <Route index element={<BusinessPage />} />
            <Route path="listings" element={<ListingsPage />} />
            <Route path="quotations" element={<QuotationsPage />} />
            <Route path="orders" element={<CustomerOrdersPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="support" element={<MerchantSupportPage />} />
          </Route>
        </Route>

        {/* Updated Customer Routes Block */}
        <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
          <Route path="/customerDashboard" element={<CustomerDashboard />} />
          <Route path="/customerServices" element={<CustomerServices />} />
          <Route path="/customerInquiries" element={<CustomerInquiries />} />
          <Route path="/customerOrders" element={<CustomerOrder />} />
          <Route path="/customerCompare" element={<CustomerCompare />} />
          <Route path="/customerSaved" element={<CustomerSave />} />
          <Route path="/customerNotifications" element={<CustomerNotification />} />
        </Route>
      </Routes>
    </Router>
  );
}