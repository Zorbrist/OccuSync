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
import CustomerPage from './pages/CustomerPage';

// Business Pages
import BusinessPage from './pages/Business/BusinessPage';
import ListingsPage from './pages/Business/ListingsPage';
import QuotationsPage from './pages/Business/QuotationsPage';
import CustomerOrdersPage from './pages/Business/CustOrdersPage';
import NotificationsPage from './pages/Business/NotificationsPage';
import MerchantSupportPage from './pages/Business/MerchantSupportPage';

// Business Layout
import Layout from './components/business_dashboard/Layout';

// Protected Route
import ProtectedRoute from './routes/ProtetedRoutes';

export default function App() {
  return (
    <Router>

      <Routes>

        {/* ========================= */}
        {/* PUBLIC ROUTES */}
        {/* ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<AboutUs />}
        />

        <Route
          path="/register/business"
          element={<RegisterBusiness />}
        />

        <Route
          path="/register/customer"
          element={<RegisterCustomer />}
        />

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ========================= */}
        {/* ADMIN ROUTES */}
        {/* ========================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={['ADMIN']}
            />
          }
        >

          <Route
            path="/admin"
            element={<AdminPage />}
          />

        </Route>


        {/* ========================= */}
        {/* BUSINESS ROUTES */}
        {/* ========================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={['BUSINESS_OWNER', 'STAFF']}
            />
          }
        >

          <Route
            path="/business"
            element={<Layout />}
          >

            {/* Business Dashboard */}
            <Route
              index
              element={<BusinessPage />}
            />

            {/* Listings */}
            <Route
              path="listings"
              element={<ListingsPage />}
            />

            {/* Quotations */}
            <Route
              path="quotations"
              element={<QuotationsPage />}
            />

            {/* Customer Orders */}
            <Route
              path="orders"
              element={<CustomerOrdersPage />}
            />

            {/* Notifications */}
            <Route
              path="notifications"
              element={<NotificationsPage />}
            />

            {/* Merchant Support */}
            <Route
              path="support"
              element={<MerchantSupportPage />}
            />

          </Route>

        </Route>


        {/* ========================= */}
        {/* CUSTOMER ROUTES */}
        {/* ========================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={['CUSTOMER']}
            />
          }
        >

          <Route
            path="/customer"
            element={<CustomerPage />}
          />

        </Route>

      </Routes>

    </Router>
  );
}