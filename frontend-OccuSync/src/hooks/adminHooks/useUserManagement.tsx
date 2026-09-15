import { useEffect, useState } from "react";

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../services/adminService";

import type {
  UserListItem,
  UserDetails,
  UserPagination,
  UserRole,
  UpdateUserRequest,
} from "../../types/adminType";

export const useAdminUsers = () => {
  // ==============================
  // User List
  // ==============================

  const [users, setUsers] = useState<UserListItem[]>([]);

  const [pagination, setPagination] =
    useState<UserPagination>({
      page: 1,
      limit: 20,
      total: 0,
      total_pages: 0,
    });

  // ==============================
  // Filters
  // ==============================

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [role, setRole] =
    useState<UserRole | undefined>(undefined);

  // ==============================
  // Loading / Error
  // ==============================

  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  // ==============================
  // Selected User
  // ==============================

  const [selectedUser, setSelectedUser] =
    useState<UserDetails | null>(null);

  const [userLoading, setUserLoading] =
    useState(false);

  // ==============================
  // Search Debounce
  // ==============================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // ==============================
  // Fetch Users
  // ==============================

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getAllUsers(
        pagination.page,
        pagination.limit,
        role,
        debouncedSearch
      );

      setUsers(result.users);
      setPagination(result.pagination);
    } catch (err) {
      console.error("Failed to load users:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Fetch When Filters Change
  // ==============================

  useEffect(() => {
    fetchUsers();
  }, [
    pagination.page,
    pagination.limit,
    role,
    debouncedSearch,
  ]);

  // ==============================
  // Get User Details
  // ==============================

  const fetchUserById = async (id: number) => {
    try {
      setUserLoading(true);
      setError(null);

      const result = await getUserById(id);

      setSelectedUser(result.user);
    } catch (err) {
      console.error(
        "Failed to load user details:",
        err
      );

      setError("Failed to load user details");
    } finally {
      setUserLoading(false);
    }
  };

  // ==============================
  // Update User
  // ==============================

  const handleUpdateUser = async (
    id: number,
    data: UpdateUserRequest
  ) => {
    try {
      setError(null);

      const result = await updateUser(id, data);

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === id
            ? {
                ...user,
                email: result.user.email,
                role: result.user.role,
                created_at:
                  result.user.created_at,
              }
            : user
        )
      );

      setSelectedUser((currentUser) => {
        if (!currentUser || currentUser.id !== id) {
          return currentUser;
        }

        return {
          ...currentUser,
          email: result.user.email,
          role: result.user.role,
          created_at:
            result.user.created_at,
          updated_at:
            result.user.updated_at,
        };
      });

      return result;
    } catch (err) {
      console.error("Failed to update user:", err);

      setError("Failed to update user");

      throw err;
    }
  };

  // ==============================
  // Delete User
  // ==============================

  const handleDeleteUser = async (id: number) => {
    try {
      setError(null);

      await deleteUser(id);

      setUsers((currentUsers) =>
        currentUsers.filter(
          (user) => user.id !== id
        )
      );

      setSelectedUser((currentUser) => {
        if (currentUser?.id === id) {
          return null;
        }

        return currentUser;
      });

      setPagination((currentPagination) => ({
        ...currentPagination,
        total: Math.max(
          currentPagination.total - 1,
          0
        ),
      }));
    } catch (err) {
      console.error("Failed to delete user:", err);

      setError("Failed to delete user");

      throw err;
    }
  };

  // ==============================
  // Pagination
  // ==============================

  const goToPage = (page: number) => {
    if (
      page < 1 ||
      page > pagination.total_pages
    ) {
      return;
    }

    setPagination((currentPagination) => ({
      ...currentPagination,
      page,
    }));
  };

  // ==============================
  // Filters
  // ==============================

  const changeRole = (
    newRole: UserRole | undefined
  ) => {
    setRole(newRole);

    setPagination((currentPagination) => ({
      ...currentPagination,
      page: 1,
    }));
  };

  const changeSearch = (value: string) => {
    setSearch(value);

    setPagination((currentPagination) => ({
      ...currentPagination,
      page: 1,
    }));
  };

  // ==============================
  // Clear Selected User
  // ==============================

  const clearSelectedUser = () => {
    setSelectedUser(null);
  };

  return {
    // Users
    users,
    pagination,

    // Filters
    search,
    role,
    changeSearch,
    changeRole,

    // Loading / Error
    loading,
    error,

    // User Details
    selectedUser,
    userLoading,
    fetchUserById,
    clearSelectedUser,

    // Update / Delete
    handleUpdateUser,
    handleDeleteUser,

    // Pagination
    goToPage,

    // Manual Refresh
    fetchUsers,
  };
};