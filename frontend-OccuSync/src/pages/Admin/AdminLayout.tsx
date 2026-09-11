// AdminLayout.tsx
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminNavBar from '../../components/admin_components/admin_navbar';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Map the current path to a nav key so AdminNavBar highlights correctly
  const activeKey = location.pathname.split('/')[2] ?? 'dashboard';

  return (
    <div className="flex h-screen w-full font-sans bg-zinc-950 text-zinc-100">
      <AdminNavBar
        activeKey={activeKey}
        onNavigate={(key) => navigate(`/admin/${key === 'dashboard' ? '' : key}`)}
        onLogout={() => {/* clear auth, redirect */}}
      />
      <Outlet />
    </div>
  );
}