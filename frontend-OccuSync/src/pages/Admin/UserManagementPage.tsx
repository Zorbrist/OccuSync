import { useEffect, useState } from 'react';
import {
    Search,
    Users,
    UserRound,
    Building2,
    Eye,
    Pencil,
    Trash2,
} from 'lucide-react';

import useAdminUsers, {
    useAdminUser,
    useUpdateAdminUser,
    useDeleteAdminUser,
} from '../../hooks/adminHooks/useAdminUsers';

import type { AdminUserUpdateData } from '../../types/adminType';

export default function UserManagementPage() {
    const [activeTab, setActiveTab] = useState<
        'customers' | 'business'
    >('customers');

    const [businessTab, setBusinessTab] = useState<
        'owners' | 'staff'
    >('owners');

    const [search, setSearch] = useState('');

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState<AdminUserUpdateData>({});

    const {
        data,
        loading,
        error,
        refetch,
    } = useAdminUsers(search);

    const {
        data: selectedUser,
        loading: selectedUserLoading,
    } = useAdminUser(
        selectedUserId !== null
            ? String(selectedUserId)
            : undefined
    );

    const {
        updateUser,
        loading: updateLoading,
        error: updateError,
    } = useUpdateAdminUser();

    const {
        deleteUser,
        loading: deleteLoading,
    } = useDeleteAdminUser();

    const customers = data?.customers ?? [];
    const businessOwners = data?.business_owners ?? [];
    const businessStaff = data?.business_staff ?? [];
    const summary = data?.summary;

    const activeBusinessUsers =
        businessTab === 'owners'
            ? businessOwners
            : businessStaff;

    // =========================
    // Populate form
    // =========================

    useEffect(() => {
        if (!selectedUser) return;

        const user = selectedUser.user;

        if (user.role === 'CUSTOMER' && selectedUser.details) {
            const customer = selectedUser.details;

            if (!Array.isArray(customer)) {
                setFormData({
                    email: user.email,
                    first_name: customer.first_name,
                    last_name: customer.last_name,
                    phone: customer.phone,
                    country: customer.country,
                    state: customer.state,
                    postcode: customer.postcode,
                });
            }
        }

        if (
            user.role === 'BUSINESS_PROVIDER' &&
            Array.isArray(selectedUser.details) &&
            selectedUser.details.length > 0
        ) {
            const business = selectedUser.details[0];

            setFormData({
                email: user.email,
                business_name: business.business_name,
                registration_no: business.registration_no,
                industry: business.industry,
                area_of_service: business.area_of_service ?? '',
                business_email: business.business_email,
                business_phone: business.business_phone,
                country: business.country,
                state: business.state,
                postcode: business.postcode,
            });
        }
    }, [selectedUser]);

    // =========================
    // Open user
    // =========================

    const openUser = (
        id: number,
        edit: boolean
    ) => {
        setSelectedUserId(id);
        setEditMode(edit);
        setFormData({});
    };

    // =========================
    // Close modal
    // =========================

    const closeModal = () => {
        setSelectedUserId(null);
        setEditMode(false);
        setFormData({});
    };

    // =========================
    // Update form
    // =========================

    const updateField = (
        field: keyof AdminUserUpdateData,
        value: string
    ) => {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));
    };

    // =========================
    // Save user
    // =========================

    const handleSave = async () => {
        if (selectedUserId === null) return;

        try {
            await updateUser(
                String(selectedUserId),
                formData
            );

            await refetch();

            closeModal();
        } catch {
            // Error is handled by the hook
        }
    };

    // =========================
    // Delete user
    // =========================

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this user?'
        );

        if (!confirmed) return;

        try {
            await deleteUser(String(id));
            refetch();
        } catch {
            // Error is handled by the hook
        }
    };

    // =========================
    // Input component
    // =========================

    const inputClass =
        'w-full bg-[#0b1120] border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 disabled:opacity-60';

    return (
        <main className="flex-1 overflow-y-auto p-8 space-y-6">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-emerald-400">
                    User Management
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Manage customers and business users.
                </p>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* TOTAL USERS */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">
                                Total Users
                            </p>

                            <h2 className="text-3xl font-bold text-white mt-2">
                                {summary?.total_users ?? 0}
                            </h2>
                        </div>

                        <div className="p-3 rounded-lg bg-emerald-500/10">
                            <Users className="w-6 h-6 text-emerald-400" />
                        </div>
                    </div>
                </div>

                {/* CUSTOMERS */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">
                                Customers
                            </p>

                            <h2 className="text-3xl font-bold text-white mt-2">
                                {summary?.total_customers ?? 0}
                            </h2>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10">
                            <UserRound className="w-6 h-6 text-blue-400" />
                        </div>
                    </div>
                </div>

                {/* OWNERS */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">
                                Business Owners
                            </p>

                            <h2 className="text-3xl font-bold text-white mt-2">
                                {summary?.total_owners ?? 0}
                            </h2>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10">
                            <Building2 className="w-6 h-6 text-purple-400" />
                        </div>
                    </div>
                </div>

                {/* STAFF */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">
                                Business Staff
                            </p>

                            <h2 className="text-3xl font-bold text-white mt-2">
                                {summary?.total_staff ?? 0}
                            </h2>
                        </div>

                        <div className="p-3 rounded-lg bg-orange-500/10">
                            <Building2 className="w-6 h-6 text-orange-400" />
                        </div>
                    </div>
                </div>

            </div>

            {/* USERS TABLE */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">

                {/* TABLE HEADER */}
                <div className="p-5 border-b border-gray-800">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                        {/* MAIN TABS */}
                        <div className="flex gap-2 border-b border-gray-800">
                            <button
                                onClick={() => setActiveTab('customers')}
                                className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
                                    activeTab === 'customers'
                                        ? 'border-emerald-400 text-emerald-400'
                                        : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                            >
                                Customers
                            </button>

                            <button
                                onClick={() => setActiveTab('business')}
                                className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
                                    activeTab === 'business'
                                        ? 'border-emerald-400 text-emerald-400'
                                        : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                            >
                                Business Users
                            </button>
                        </div>

                        {/* SEARCH */}
                        <div className="relative w-full lg:w-80">

                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={
                                    activeTab === 'customers'
                                        ? 'Search name or email...'
                                        : 'Search business or email...'
                                }
                                className="w-full bg-[#0b1120] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                            />

                        </div>

                    </div>

                    {/* BUSINESS SUB TABS */}
                    {activeTab === 'business' && (
                        <div className="flex gap-2 mt-5">

                            <button
                                onClick={() => setBusinessTab('owners')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    businessTab === 'owners'
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                Owners ({businessOwners.length})
                            </button>

                            <button
                                onClick={() => setBusinessTab('staff')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    businessTab === 'staff'
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                Staff ({businessStaff.length})
                            </button>

                        </div>
                    )}

                </div>

                {/* ERROR */}
                {error && (
                    <div className="p-5 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* LOADING */}
                {loading && (
                    <div className="p-10 text-center text-gray-400">
                        Loading users...
                    </div>
                )}

                {/* TABLE */}
                {!loading && !error && (
                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>
                                {activeTab === 'customers' ? (
                                    <tr className="border-b border-gray-800 text-left">

                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                                            Name
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                                            Email
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                                            Phone
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase text-right">
                                            Actions
                                        </th>

                                    </tr>
                                ) : (
                                    <tr className="border-b border-gray-800 text-left">

                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                                            User Email
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                                            Business
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                                            Business Email
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                                            Phone
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase text-right">
                                            Actions
                                        </th>

                                    </tr>
                                )}
                            </thead>

                            <tbody>

                                {/* CUSTOMERS */}
                                {activeTab === 'customers' &&
                                    customers.map((customer) => (
                                        <tr
                                            key={customer.id}
                                            className="border-b border-gray-800 hover:bg-white/[0.02]"
                                        >
                                            <td className="px-5 py-4 text-sm text-white">
                                                {customer.first_name}{' '}
                                                {customer.last_name}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-400">
                                                {customer.email}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-400">
                                                {customer.phone || '-'}
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">

                                                    <button
                                                        onClick={() =>
                                                            openUser(
                                                                customer.id,
                                                                false
                                                            )
                                                        }
                                                        className="p-2 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            openUser(
                                                                customer.id,
                                                                true
                                                            )
                                                        }
                                                        className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                customer.id
                                                            )
                                                        }
                                                        disabled={deleteLoading}
                                                        className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                {/* BUSINESS USERS */}
                                {activeTab === 'business' &&
                                    activeBusinessUsers.map((businessUser) => (
                                        <tr
                                            key={businessUser.member_id}
                                            className="border-b border-gray-800 hover:bg-white/[0.02]"
                                        >
                                            <td className="px-5 py-4 text-sm text-white">
                                                {businessUser.user_email}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-white">
                                                {businessUser.business_name}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-400">
                                                {businessUser.business_email}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-400">
                                                {businessUser.business_phone || '-'}
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">

                                                    <button
                                                        onClick={() =>
                                                            openUser(
                                                                businessUser.user_id,
                                                                false
                                                            )
                                                        }
                                                        className="p-2 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            openUser(
                                                                businessUser.user_id,
                                                                true
                                                            )
                                                        }
                                                        className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                businessUser.user_id
                                                            )
                                                        }
                                                        disabled={deleteLoading}
                                                        className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                {/* EMPTY STATE */}
                                {(
                                    activeTab === 'customers'
                                        ? customers.length === 0
                                        : activeBusinessUsers.length === 0
                                ) && (
                                    <tr>
                                        <td
                                            colSpan={
                                                activeTab === 'customers'
                                                    ? 4
                                                    : 5
                                            }
                                            className="px-5 py-12 text-center text-gray-500"
                                        >
                                            No{' '}
                                            {activeTab === 'customers'
                                                ? 'customers'
                                                : businessTab === 'owners'
                                                    ? 'business owners'
                                                    : 'business staff'}{' '}
                                            found.
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

            {/* USER MODAL */}
            {selectedUserId !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={closeModal}
                >
                    <div
                        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111827] border border-gray-800 rounded-xl p-6"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* MODAL HEADER */}
                        <div className="flex items-center justify-between mb-6">

                            <h2 className="text-xl font-bold text-white">
                                {editMode
                                    ? 'Edit User'
                                    : 'User Details'}
                            </h2>

                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-white"
                            >
                                ✕
                            </button>

                        </div>

                        {selectedUserLoading ? (
                            <p className="text-gray-400">
                                Loading details...
                            </p>
                        ) : selectedUser ? (
                            <div className="space-y-5">

                                {/* USER INFORMATION */}
                                <div className="space-y-4">

                                    <h3 className="text-sm font-semibold text-emerald-400 uppercase">
                                        User Information
                                    </h3>

                                    <div>
                                        <label className="block text-xs text-gray-500 uppercase mb-1">
                                            Email
                                        </label>

                                        {editMode ? (
                                            <input
                                                type="email"
                                                value={formData.email ?? ''}
                                                onChange={(e) =>
                                                    updateField(
                                                        'email',
                                                        e.target.value
                                                    )
                                                }
                                                className={inputClass}
                                            />
                                        ) : (
                                            <p className="text-white">
                                                {selectedUser.user.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-500 uppercase mb-1">
                                            Role
                                        </label>

                                        <p className="text-white">
                                            {selectedUser.user.role}
                                        </p>
                                    </div>

                                </div>

                                {/* CUSTOMER DETAILS */}
                                {selectedUser.user.role === 'CUSTOMER' &&
                                    !Array.isArray(selectedUser.details) &&
                                    selectedUser.details && (
                                        <div className="space-y-4">

                                            <h3 className="text-sm font-semibold text-emerald-400 uppercase">
                                                Customer Information
                                            </h3>

                                            <div className="grid grid-cols-2 gap-4">

                                                <div>
                                                    <label className="block text-xs text-gray-500 uppercase mb-1">
                                                        First Name
                                                    </label>

                                                    {editMode ? (
                                                        <input
                                                            value={formData.first_name ?? ''}
                                                            onChange={(e) =>
                                                                updateField(
                                                                    'first_name',
                                                                    e.target.value
                                                                )
                                                            }
                                                            className={inputClass}
                                                        />
                                                    ) : (
                                                        <p className="text-white">
                                                            {selectedUser.details.first_name}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs text-gray-500 uppercase mb-1">
                                                        Last Name
                                                    </label>

                                                    {editMode ? (
                                                        <input
                                                            value={formData.last_name ?? ''}
                                                            onChange={(e) =>
                                                                updateField(
                                                                    'last_name',
                                                                    e.target.value
                                                                )
                                                            }
                                                            className={inputClass}
                                                        />
                                                    ) : (
                                                        <p className="text-white">
                                                            {selectedUser.details.last_name}
                                                        </p>
                                                    )}
                                                </div>

                                            </div>

                                            <div>
                                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                                    Phone
                                                </label>

                                                {editMode ? (
                                                    <input
                                                        value={formData.phone ?? ''}
                                                        onChange={(e) =>
                                                            updateField(
                                                                'phone',
                                                                e.target.value
                                                            )
                                                        }
                                                        className={inputClass}
                                                    />
                                                ) : (
                                                    <p className="text-white">
                                                        {selectedUser.details.phone}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-3 gap-4">

                                                <div>
                                                    <label className="block text-xs text-gray-500 uppercase mb-1">
                                                        Country
                                                    </label>

                                                    {editMode ? (
                                                        <input
                                                            value={formData.country ?? ''}
                                                            onChange={(e) =>
                                                                updateField(
                                                                    'country',
                                                                    e.target.value
                                                                )
                                                            }
                                                            className={inputClass}
                                                        />
                                                    ) : (
                                                        <p className="text-white">
                                                            {selectedUser.details.country}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs text-gray-500 uppercase mb-1">
                                                        State
                                                    </label>

                                                    {editMode ? (
                                                        <input
                                                            value={formData.state ?? ''}
                                                            onChange={(e) =>
                                                                updateField(
                                                                    'state',
                                                                    e.target.value
                                                                )
                                                            }
                                                            className={inputClass}
                                                        />
                                                    ) : (
                                                        <p className="text-white">
                                                            {selectedUser.details.state}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs text-gray-500 uppercase mb-1">
                                                        Postcode
                                                    </label>

                                                    {editMode ? (
                                                        <input
                                                            value={formData.postcode ?? ''}
                                                            onChange={(e) =>
                                                                updateField(
                                                                    'postcode',
                                                                    e.target.value
                                                                )
                                                            }
                                                            className={inputClass}
                                                        />
                                                    ) : (
                                                        <p className="text-white">
                                                            {selectedUser.details.postcode}
                                                        </p>
                                                    )}
                                                </div>

                                            </div>

                                        </div>
                                    )}

                                {/* BUSINESS DETAILS */}
                                {selectedUser.user.role === 'BUSINESS_PROVIDER' &&
                                    Array.isArray(selectedUser.details) &&
                                    selectedUser.details.length > 0 && (
                                        <div className="space-y-4">

                                            <h3 className="text-sm font-semibold text-emerald-400 uppercase">
                                                Business Information
                                            </h3>

                                            {(() => {
                                                const business = selectedUser.details[0];

                                                return (
                                                    <>
                                                        <div>
                                                            <label className="block text-xs text-gray-500 uppercase mb-1">
                                                                Business Name
                                                            </label>

                                                            {editMode ? (
                                                                <input
                                                                    value={formData.business_name ?? ''}
                                                                    onChange={(e) =>
                                                                        updateField(
                                                                            'business_name',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className={inputClass}
                                                                />
                                                            ) : (
                                                                <p className="text-white">
                                                                    {business.business_name}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4">

                                                            <div>
                                                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                                                    Business Email
                                                                </label>

                                                                {editMode ? (
                                                                    <input
                                                                        type="email"
                                                                        value={formData.business_email ?? ''}
                                                                        onChange={(e) =>
                                                                            updateField(
                                                                                'business_email',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className={inputClass}
                                                                    />
                                                                ) : (
                                                                    <p className="text-white">
                                                                        {business.business_email}
                                                                    </p>
                                                                )}
                                                            </div>

                                                            <div>
                                                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                                                    Business Phone
                                                                </label>

                                                                {editMode ? (
                                                                    <input
                                                                        value={formData.business_phone ?? ''}
                                                                        onChange={(e) =>
                                                                            updateField(
                                                                                'business_phone',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className={inputClass}
                                                                    />
                                                                ) : (
                                                                    <p className="text-white">
                                                                        {business.business_phone}
                                                                    </p>
                                                                )}
                                                            </div>

                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4">

                                                            <div>
                                                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                                                    Registration No.
                                                                </label>

                                                                {editMode ? (
                                                                    <input
                                                                        value={formData.registration_no ?? ''}
                                                                        onChange={(e) =>
                                                                            updateField(
                                                                                'registration_no',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className={inputClass}
                                                                    />
                                                                ) : (
                                                                    <p className="text-white">
                                                                        {business.registration_no}
                                                                    </p>
                                                                )}
                                                            </div>

                                                            <div>
                                                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                                                    Industry
                                                                </label>

                                                                {editMode ? (
                                                                    <input
                                                                        value={formData.industry ?? ''}
                                                                        onChange={(e) =>
                                                                            updateField(
                                                                                'industry',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className={inputClass}
                                                                    />
                                                                ) : (
                                                                    <p className="text-white">
                                                                        {business.industry}
                                                                    </p>
                                                                )}
                                                            </div>

                                                        </div>

                                                        <div>
                                                            <label className="block text-xs text-gray-500 uppercase mb-1">
                                                                Area of Service
                                                            </label>

                                                            {editMode ? (
                                                                <input
                                                                    value={formData.area_of_service ?? ''}
                                                                    onChange={(e) =>
                                                                        updateField(
                                                                            'area_of_service',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className={inputClass}
                                                                />
                                                            ) : (
                                                                <p className="text-white">
                                                                    {business.area_of_service || '-'}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="grid grid-cols-3 gap-4">

                                                            <div>
                                                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                                                    Country
                                                                </label>

                                                                {editMode ? (
                                                                    <input
                                                                        value={formData.country ?? ''}
                                                                        onChange={(e) =>
                                                                            updateField(
                                                                                'country',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className={inputClass}
                                                                    />
                                                                ) : (
                                                                    <p className="text-white">
                                                                        {business.country}
                                                                    </p>
                                                                )}
                                                            </div>

                                                            <div>
                                                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                                                    State
                                                                </label>

                                                                {editMode ? (
                                                                    <input
                                                                        value={formData.state ?? ''}
                                                                        onChange={(e) =>
                                                                            updateField(
                                                                                'state',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className={inputClass}
                                                                    />
                                                                ) : (
                                                                    <p className="text-white">
                                                                        {business.state}
                                                                    </p>
                                                                )}
                                                            </div>

                                                            <div>
                                                                <label className="block text-xs text-gray-500 uppercase mb-1">
                                                                    Postcode
                                                                </label>

                                                                {editMode ? (
                                                                    <input
                                                                        value={formData.postcode ?? ''}
                                                                        onChange={(e) =>
                                                                            updateField(
                                                                                'postcode',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className={inputClass}
                                                                    />
                                                                ) : (
                                                                    <p className="text-white">
                                                                        {business.postcode}
                                                                    </p>
                                                                )}
                                                            </div>

                                                        </div>
                                                    </>
                                                );
                                            })()}

                                        </div>
                                    )}

                                {/* UPDATE ERROR */}
                                {updateError && (
                                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                                        {updateError}
                                    </div>
                                )}

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">

                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-white/5"
                                    >
                                        Close
                                    </button>

                                    {editMode && (
                                        <button
                                            onClick={handleSave}
                                            disabled={updateLoading}
                                            className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-400 disabled:opacity-50"
                                        >
                                            {updateLoading
                                                ? 'Saving...'
                                                : 'Save Changes'}
                                        </button>
                                    )}

                                </div>

                            </div>
                        ) : (
                            <p className="text-gray-400">
                                Unable to load user details.
                            </p>
                        )}

                    </div>
                </div>
            )}

        </main>
    );
}