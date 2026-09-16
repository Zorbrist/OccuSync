// components/Admin/UserModal.tsx
import { useState } from "react";
import type { UserDetails, UpdateUserRequest } from "../../types/adminType";
import { X, User, MapPin, Building2, Trash2, Save, Edit2 } from "lucide-react";

type UserModalProps = {
  user: UserDetails;
  onClose: () => void;
  onUpdate: (id: number, data: UpdateUserRequest) => Promise<unknown>;
  onDelete: (id: number) => Promise<void>;
};

export default function UserModal({ user, onClose, onUpdate, onDelete }: UserModalProps) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [email, setEmail] = useState(user.email);
  const profile = user.profile;
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [address, setAddress] = useState(user.role === "CUSTOMER" && profile && "address_line" in profile ? profile.address_line : "");
  const [state, setState] = useState(user.role === "CUSTOMER" && profile && "state" in profile ? profile.state : "");
  const [postcode, setPostcode] = useState(user.role === "CUSTOMER" && profile && "postcode" in profile ? profile.postcode : "");
  const [country, setCountry] = useState(user.role === "CUSTOMER" && profile && "country" in profile ? profile.country : "");

  const handleSave = async () => {
    try {
      setSaving(true);
      const data: UpdateUserRequest = {
        email,
        profile: user.role === "CUSTOMER"
          ? { first_name: firstName, last_name: lastName, phone, address_line: address, state, postcode, country }
          : { first_name: firstName, last_name: lastName, phone },
      };
      await onUpdate(user.id, data);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to permanently delete ${user.email}?`);
    if (confirmed) await onDelete(user.id);
  };

  // Highly compact input styling
  const inputClass = "mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-[#0F172A] outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-50 transition-all";

  return (
    <div
      // Fixed z-[100] ensures it NEVER underlaps the z-50 navigation bar
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-[1.5rem] border border-white bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden scale-100 animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-[#F1F5F9]/50 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] leading-tight">User Record</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">
              Role: <span className="text-violet-600">{user.role}</span>
            </p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black hover:bg-slate-50 transition-all border border-slate-100">
            <X size={14} />
          </button>
        </div>

        {/* Compact Scrollable Body */}
        <div className="px-6 py-4 space-y-5 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          
          {/* Identity & Contact (Grid Layout to save space) */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
              <User size={12}/> Identity & Contact
            </h3>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {user.role !== "ADMIN" && (
                <>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500">First Name</label>
                    {editing ? <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} /> 
                             : <p className="mt-0.5 text-xs font-semibold text-[#1E293B] truncate">{firstName || "-"}</p>}
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500">Last Name</label>
                    {editing ? <input value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} /> 
                             : <p className="mt-0.5 text-xs font-semibold text-[#1E293B] truncate">{lastName || "-"}</p>}
                  </div>
                </>
              )}
              <div className={user.role === "ADMIN" ? "col-span-2" : ""}>
                <label className="text-[11px] font-semibold text-slate-500">Email Address</label>
                {editing ? <input value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} /> 
                         : <p className="mt-0.5 text-xs font-semibold text-[#1E293B] truncate">{user.email}</p>}
              </div>
              {user.role !== "ADMIN" && (
                <div>
                  <label className="text-[11px] font-semibold text-slate-500">Phone</label>
                  {editing ? <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} /> 
                           : <p className="mt-0.5 text-xs font-semibold text-[#1E293B] truncate">{phone || "-"}</p>}
                </div>
              )}
            </div>
          </div>

          {/* Location Section (Customer Only) */}
          {user.role === "CUSTOMER" && (
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                <MapPin size={12}/> Address Details
              </h3>
              
              <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                <div className="col-span-3">
                  <label className="text-[11px] font-semibold text-slate-500">Street Address</label>
                  {editing ? <input value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} /> 
                           : <p className="mt-0.5 text-xs font-semibold text-[#1E293B] truncate">{address || "-"}</p>}
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500">State</label>
                  {editing ? <input value={state} onChange={(e) => setState(e.target.value)} className={inputClass} /> 
                           : <p className="mt-0.5 text-xs font-semibold text-[#1E293B] truncate">{state || "-"}</p>}
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500">Postcode</label>
                  {editing ? <input value={postcode} onChange={(e) => setPostcode(e.target.value)} className={inputClass} /> 
                           : <p className="mt-0.5 text-xs font-semibold text-[#1E293B] truncate">{postcode || "-"}</p>}
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500">Country</label>
                  {editing ? <input value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass} /> 
                           : <p className="mt-0.5 text-xs font-semibold text-[#1E293B] truncate">{country || "-"}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Business Memberships Section */}
          {user.role === "BUSINESS_PROVIDER" && user.businesses && user.businesses.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                <Building2 size={12}/> Affiliated Businesses
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {user.businesses.map((business) => (
                  <div key={business.membership_id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-bold text-[#0F172A] truncate">{business.business_name}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-violet-100 text-violet-700 text-[9px] font-bold rounded uppercase tracking-wider">
                      {business.membership_role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Compact Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-slate-50/50 shrink-0">
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 transition-colors shadow-sm"
          >
            <Trash2 size={12} /> Delete
          </button>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-[#0F172A] hover:bg-slate-200 transition-colors"
            >
              Close
            </button>

            {editing ? (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1.5 px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-violet-600 hover:bg-violet-700 shadow-sm transition-all disabled:opacity-50"
              >
                <Save size={12} /> {saving ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-black shadow-sm transition-all"
              >
                <Edit2 size={12} /> Edit Data
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}