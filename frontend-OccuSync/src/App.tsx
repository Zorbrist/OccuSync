import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import RegisterBusiness from './pages/RegisterBusiness';
import RegisterCustomer from './pages/RegisterCustomer';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import AdminPage from './pages/AdminPage';
import BusinessPage from './pages/BusinessPage';
import CustomerPage from './pages/CustomerPage';
import ProtectedRoute from './routes/ProtetedRoutes';
import './App.css';

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register/business" element={<RegisterBusiness />} />
        <Route path="/register/customer" element={<RegisterCustomer />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['BUSINESS_OWNER', 'STAFF']} />}>
          <Route path="/business" element={<BusinessPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['CUSTOMER']} />}>
          <Route path="/customer" element={<CustomerPage />} />
        </Route>

      </Routes>
    </Router>
  )
}


