// useAdminUsers.ts
//
// React hooks wrapping adminService user management methods with
// loading/error state and manual refetch, so components can just do:
//
//   const { data, loading, error, refetch } = useAdminUsers();
//
//   const { data, loading, error } = useAdminUser(userId);
//
import { useState, useEffect, useCallback } from 'react';

import adminService from '../../services/adminService';

import type {
  AdminUsersData,
  AdminUserDetailsData,
  AdminUserUpdateData
} from '../../types/adminType';

// =========================
// Get All Users
// =========================

interface UseAdminUsersResult {
  data: AdminUsersData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}


const useAdminUsers = (
  search?: string,
  role?: 'CUSTOMER' | 'SERVICE_PROVIDER'
): UseAdminUsersResult => {
  const [data, setData] = useState<AdminUsersData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await adminService.getAllUsers(search);
      setData(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong while loading users.';

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [search, role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    data,
    loading,
    error,
    refetch: fetchUsers,
  };
};

// =========================
// Get Individual User
// =========================

interface UseAdminUserResult {
  data: AdminUserDetailsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useAdminUser = (id?: string): UseAdminUserResult => {
  const [data, setData] = useState<AdminUserDetailsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const result = await adminService.getUserById(id);
      setData(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong while loading user details.';

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    data,
    loading,
    error,
    refetch: fetchUser,
  };
};

// =========================
// Update User
// =========================

interface UpdateAdminUserData {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  business_name?: string;
  address?: string;
}


interface UseUpdateAdminUserResult {
  updateUser: (
    id: string,
    data: AdminUserUpdateData
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useUpdateAdminUser = (): UseUpdateAdminUserResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = useCallback(
    async (id: string, data: UpdateAdminUserData): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        await adminService.updateUser(id, data);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Something went wrong while updating the user.';

        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    updateUser,
    loading,
    error,
  };
};

// =========================
// Delete User
// =========================

interface UseDeleteAdminUserResult {
  deleteUser: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useDeleteAdminUser = (): UseDeleteAdminUserResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await adminService.deleteUser(id);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong while deleting the user.';

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    deleteUser,
    loading,
    error,
  };
};

export {
  useAdminUsers,
  useAdminUser,
  useUpdateAdminUser,
  useDeleteAdminUser,
};

export default useAdminUsers;