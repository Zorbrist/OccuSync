import { useState, useRef, useEffect } from 'react';
import { Search, Plus, Mail, X, UserPlus } from 'lucide-react';
import { inviteStaff } from '../../services/authService';

export default function StaffInvitePage() {
  const [email, setEmail] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [renderInvite, setRenderInvite] = useState(false);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // ============================================================
  // MOUNT / UNMOUNT WITH ANIMATION
  // Keep the card mounted for a moment after closing so the
  // close animation has time to actually play.
  // ============================================================

  useEffect(() => {
    if (showInvite) {
      setRenderInvite(true);
      return;
    }

    if (renderInvite) {
      const timeout = setTimeout(() => setRenderInvite(false), 180);
      return () => clearTimeout(timeout);
    }
  }, [showInvite, renderInvite]);

  // ============================================================
  // CLOSE ON OUTSIDE CLICK / ESCAPE
  // ============================================================

  useEffect(() => {
    if (!showInvite) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        dropdownRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }

      setShowInvite(false);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowInvite(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showInvite]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage('');

      const response = await inviteStaff({ email });

      setMessage(response.message);
      setEmail('');

    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-slate-50 p-6">

      {/* Local keyframes for the popover + backdrop */}
      <style>{`
        @keyframes staffDropdownIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes staffDropdownOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(-10px) scale(0.96); }
        }
        @keyframes staffOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes staffOverlayOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>

      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-rose-950">
            Staff
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage your staff members and send invitations to new team members.
          </p>
        </div>

        {/* Add Staff Button + anchored Invite Dropdown */}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => {
              setShowInvite(!showInvite);
              setMessage('');
            }}
            className="relative z-50 flex items-center gap-2 rounded-2xl bg-rose-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-900"
          >
            {showInvite ? (
              <>
                <X size={17} />
                Close
              </>
            ) : (
              <>
                <Plus size={17} />
                Add Staff
              </>
            )}
          </button>

          {renderInvite && (
            <div
              ref={dropdownRef}
              style={{
                animation: showInvite
                  ? 'staffDropdownIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                  : 'staffDropdownOut 0.18s cubic-bezier(0.4, 0, 1, 1) forwards',
              }}
              className="absolute right-0 top-full z-50 mt-3 w-96 max-w-[calc(100vw-3rem)] origin-top-right rounded-3xl border border-rose-100 bg-white p-5 shadow-2xl shadow-rose-950/10"
            >
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100">
                  <UserPlus size={19} className="text-rose-700" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Invite a staff member
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Enter their email address and we'll send them an invitation.
                  </p>
                </div>
              </div>

              <form onSubmit={handleInvite}>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@example.com"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-rose-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 w-full rounded-2xl bg-rose-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rose-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Sending invitation...' : 'Send Invitation'}
                </button>
              </form>

              {/* Success / Error Message */}
              {message && (
                <div className="mt-3 rounded-2xl bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                  {message}
                </div>
              )}
            </div>
          )}

          {/* Soft overlay so the dropdown reads as sitting above the page */}
          {renderInvite && (
            <div
              style={{
                animation: showInvite
                  ? 'staffOverlayIn 0.22s ease-out forwards'
                  : 'staffOverlayOut 0.18s ease-in forwards',
              }}
              className="fixed inset-0 z-40 bg-slate-950/10"
              onClick={() => setShowInvite(false)}
            />
          )}
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search staff..."
            className="w-full rounded-2xl border border-rose-100 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-rose-300"
          />
        </div>
      </div>

      {/* Staff Table */}
      <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-xl shadow-rose-950/5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-rose-100 bg-slate-50">
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                Name
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                Email
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                Role
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                colSpan={5}
                className="px-5 py-16 text-center"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-amber-100">
                    <UserPlus size={21} className="text-rose-400" />
                  </div>

                  <p className="text-sm font-bold text-slate-900">
                    No staff members yet
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Add a staff member to get started.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}