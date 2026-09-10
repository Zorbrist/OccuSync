import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    // Locked viewport height + no window scrollbar
    <div className="flex h-screen w-full font-sans bg-stone-100 overflow-hidden">

      {/* SIDEBAR (Stays static inside the locked viewport) */}
      <Sidebar />

      {/* PAGE CONTENT (Handles scrolling internally) */}
      <main className="flex-1 min-w-0 h-full overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}