import { useState } from "react";

import { useAdminUsers } from "../../hooks/adminHooks/useUserManagement";

import type {
  UserDetails,
  UpdateUserRequest,
} from "../../types/adminType";

export default function UserManagement() {
  const {
    users,
    search,
    changeSearch,
    changeRole,
    loading,
    error,
    selectedUser,
    fetchUserById,
    clearSelectedUser,
    handleUpdateUser,
    handleDeleteUser,
  } = useAdminUsers();

  const [activeTab, setActiveTab] = useState<
    "CUSTOMER" | "BUSINESS_PROVIDER"
  >("CUSTOMER");

  return (
    <div className="min-h-screen space-y-6 bg-zinc-950 p-6 text-zinc-100">

      {/* ==============================
          Header
      ============================== */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          User Management
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Manage customers and business providers.
        </p>
      </div>

      {/* ==============================
          Search
      ============================== */}

      <div>
        <input
          type="text"
          value={search}
          onChange={(event) =>
            changeSearch(event.target.value)
          }
          placeholder="Search users by email..."
          className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 transition focus:border-violet-500"
        />
      </div>

      {/* ==============================
          Tabs
      ============================== */}

      <div className="flex gap-1 border-b border-zinc-800">

        <button
          type="button"
          onClick={() => {
            setActiveTab("CUSTOMER");
            changeRole("CUSTOMER");
          }}
          className={`border-b-2 px-5 py-3 text-sm font-medium transition ${
            activeTab === "CUSTOMER"
              ? "border-violet-500 text-violet-300"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Customers
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("BUSINESS_PROVIDER");
            changeRole("BUSINESS_PROVIDER");
          }}
          className={`border-b-2 px-5 py-3 text-sm font-medium transition ${
            activeTab === "BUSINESS_PROVIDER"
              ? "border-violet-500 text-violet-300"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Business Providers
        </button>

      </div>

      {/* ==============================
          Table
      ============================== */}

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">

        <div className="border-b border-zinc-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            {activeTab === "CUSTOMER"
              ? "Customers"
              : "Business Providers"}
          </h2>
          <p></p>
        </div>

        {loading && (
          <div className="px-6 py-8 text-center text-sm text-zinc-500">
            Loading users...
          </div>
        )}

        {error && !loading && (
          <div className="px-6 py-8 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">

              <thead className="bg-zinc-900/70 text-xs uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="px-6 py-3">
                    Name
                  </th>

                  <th className="px-6 py-3">
                    Email
                  </th>

                  <th className="px-6 py-3">
                    Phone
                  </th>

                  <th className="px-6 py-3">
                    Registered
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800/70">

                {users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() =>
                      fetchUserById(user.id)
                    }
                    className="cursor-pointer transition-colors hover:bg-violet-500/5"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-zinc-100">
                        {user.first_name ||
                        user.last_name
                          ? `${user.first_name || ""} ${
                              user.last_name || ""
                            }`.trim()
                          : "No name"}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-zinc-400">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-zinc-400">
                      {user.phone || "-"}
                    </td>

                    <td className="px-6 py-4 text-zinc-400">
                      {new Date(
                        user.created_at
                      ).toLocaleDateString("en-MY")}
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-10 text-center text-sm text-zinc-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* ==============================
          User Details Modal
      ============================== */}

      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={clearSelectedUser}
          onUpdate={handleUpdateUser}
          onDelete={handleDeleteUser}
        />
      )}

    </div>
  );
}


// =====================================================
// User Modal
// =====================================================

type UserModalProps = {
  user: UserDetails;
  onClose: () => void;
  onUpdate: (
    id: number,
    data: UpdateUserRequest
  ) => Promise<unknown>;
  onDelete: (id: number) => Promise<void>;
};

function UserModal({
  user,
  onClose,
  onUpdate,
  onDelete,
}: UserModalProps) {
  const [editing, setEditing] = useState(false);

  const [email, setEmail] = useState(user.email);

  const profile = user.profile;

  const [firstName, setFirstName] = useState(
    profile?.first_name || ""
  );

  const [lastName, setLastName] = useState(
    profile?.last_name || ""
  );

  const [phone, setPhone] = useState(
    profile?.phone || ""
  );

const [address, setAddress] = useState(
  user.role === "CUSTOMER" &&
  profile &&
  "address_line" in profile
    ? profile.address_line
    : ""
);

const [state, setState] = useState(
  user.role === "CUSTOMER" &&
  profile &&
  "state" in profile
    ? profile.state
    : ""
);

const [postcode, setPostcode] = useState(
  user.role === "CUSTOMER" &&
  profile &&
  "postcode" in profile
    ? profile.postcode
    : ""
);

const [country, setCountry] = useState(
  user.role === "CUSTOMER" &&
  profile &&
  "country" in profile
    ? profile.country
    : ""
);

  const [saving, setSaving] = useState(false);

  // ==============================
  // Save
  // ==============================

  const handleSave = async () => {
    try {
      setSaving(true);

      const data: UpdateUserRequest = {
        email,
        profile:
          user.role === "CUSTOMER"
            ? {
                first_name: firstName,
                last_name: lastName,
                phone,
                address_line: address,
                state,
                postcode,
                country,
              }
            : {
                first_name: firstName,
                last_name: lastName,
                phone,
              },
      };

      await onUpdate(user.id, data);

      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // Delete
  // ==============================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.email}?`
    );

    if (!confirmed) {
      return;
    }

    await onDelete(user.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* ==============================
            Header
        ============================== */}

        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">

          <div>
            <h2 className="text-lg font-semibold text-white">
              User Details
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {user.role}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-zinc-500 hover:text-white"
          >
            ×
          </button>

        </div>

        {/* ==============================
            Details
        ============================== */}

        <div className="space-y-4 px-6 py-5">

          {/* Email */}

          <div>
            <label className="text-xs uppercase text-zinc-500">
              Email
            </label>

            {editing ? (
              <input
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500"
              />
            ) : (
              <p className="mt-1 text-sm text-zinc-300">
                {user.email}
              </p>
            )}
          </div>

          {/* Name */}

          {user.role !== "ADMIN" && (
            <>
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-xs uppercase text-zinc-500">
                    First Name
                  </label>

                  {editing ? (
                    <input
                      value={firstName}
                      onChange={(event) =>
                        setFirstName(
                          event.target.value
                        )
                      }
                      className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-zinc-300">
                      {firstName || "-"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs uppercase text-zinc-500">
                    Last Name
                  </label>

                  {editing ? (
                    <input
                      value={lastName}
                      onChange={(event) =>
                        setLastName(
                          event.target.value
                        )
                      }
                      className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-zinc-300">
                      {lastName || "-"}
                    </p>
                  )}
                </div>

              </div>

              {/* Phone */}

              <div>
                <label className="text-xs uppercase text-zinc-500">
                  Phone
                </label>

                {editing ? (
                  <input
                    value={phone}
                    onChange={(event) =>
                      setPhone(
                        event.target.value
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-zinc-300">
                    {phone || "-"}
                  </p>
                )}
              </div>

              {/* Customer Address */}

              {user.role === "CUSTOMER" && (
                <>
                  <div>
                    <label className="text-xs uppercase text-zinc-500">
                      Address
                    </label>

                    {editing ? (
                      <input
                        value={address}
                        onChange={(event) =>
                          setAddress(
                            event.target.value
                          )
                        }
                        className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-zinc-300">
                        {address || "-"}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3">

                    <div>
                      <label className="text-xs uppercase text-zinc-500">
                        State
                      </label>

                      <p className="mt-1 text-sm text-zinc-300">
                        {state || "-"}
                      </p>
                    </div>

                    <div>
                      <label className="text-xs uppercase text-zinc-500">
                        Postcode
                      </label>

                      <p className="mt-1 text-sm text-zinc-300">
                        {postcode || "-"}
                      </p>
                    </div>

                    <div>
                      <label className="text-xs uppercase text-zinc-500">
                        Country
                      </label>

                      <p className="mt-1 text-sm text-zinc-300">
                        {country || "-"}
                      </p>
                    </div>

                  </div>
                </>
              )}
            </>
          )}

          {/* Business Memberships */}

          {user.role === "BUSINESS_PROVIDER" &&
            user.businesses &&
            user.businesses.length > 0 && (
              <div>
                <label className="text-xs uppercase text-zinc-500">
                  Businesses
                </label>

                <div className="mt-2 space-y-2">
                  {user.businesses.map(
                    (business) => (
                      <div
                        key={
                          business.membership_id
                        }
                        className="rounded-lg border border-zinc-800 bg-zinc-900 p-3"
                      >
                        <p className="text-sm font-medium text-zinc-200">
                          {business.business_name}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {business.membership_role}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

        </div>

        {/* ==============================
            Footer
        ============================== */}

        <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-4">

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
          >
            Delete
          </button>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900"
            >
              Close
            </button>

            {editing ? (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setEditing(true)
                }
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
              >
                Edit
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}