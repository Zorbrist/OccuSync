import axiosInstance from "../api/axiosInstance";

import type {
  AdminDashboard,
  GetAllUsersResponse,
  GetUserByIdResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserResponse,
  UserRole,
} from "../types/adminType";

export const getAdminDashboard = async (): Promise<AdminDashboard> => {
  const response = await axiosInstance.get<AdminDashboard>("/admin/dashboard");

  return response.data;
};

export const updateBusinessStatus = async (
  id: string,
  approval_status: "APPROVED" | "REJECTED"
) => {
  const response = await axiosInstance.patch(
    `/admin/businesses/${id}/status`,
    {
      approval_status,
    }
  );

  return response.data;
};




// ==============================
// Get All Users
// ==============================

export const getAllUsers = async (
  page: number = 1,
  limit: number = 20,
  role?: UserRole,
  search?: string
): Promise<GetAllUsersResponse> => {
  const response = await axiosInstance.get<GetAllUsersResponse>(
    "/admin/users",
    {
      params: {
        page,
        limit,
        role,
        search,
      },
    }
  );

  return response.data;
};

// ==============================
// Get User By ID
// ==============================

export const getUserById = async (
  id: number
): Promise<GetUserByIdResponse> => {
  const response = await axiosInstance.get<GetUserByIdResponse>(
    `/admin/users/${id}`
  );

  return response.data;
};

// ==============================
// Update User
// ==============================

export const updateUser = async (
  id: number,
  data: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const response = await axiosInstance.patch<UpdateUserResponse>(
    `/admin/users/${id}`,
    data
  );

  return response.data;
};

// ==============================
// Delete User
// ==============================

export const deleteUser = async (
  id: number
): Promise<DeleteUserResponse> => {
  const response = await axiosInstance.delete<DeleteUserResponse>(
    `/admin/users/${id}`
  );

  return response.data;
};


