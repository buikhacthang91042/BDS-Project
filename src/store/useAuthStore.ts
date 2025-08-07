import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";

interface AuthState {
  isSigningup: boolean;
  authUser: { name: string; phone: string } | null;
  tempSignupData: { name: string; phone: string; password: string } | null;
}

interface AuthActions {
  signUp: (
    data: {
      name: string;
      phone: string;
      password: string;
      confirmPassword?: string;
    },
    navigate: () => void
  ) => Promise<void>;
  storeTempSignupData: (data: {
    name: string;
    phone: string;
    password: string;
  }) => void;
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isSigningup: false,
  authUser: null,
  tempSignupData: null,

  signUp: async (data, navigate) => {
    set({ isSigningup: true });
    try {
      const res = await axiosInstance.post("/register", data);
      if (res.status === 201) {
        toast.success(res.data.message || "Đăng kí thành công");
        set({ authUser: { name: data.name, phone: data.phone } });
        navigate();
      } else {
        toast.error(res.data.message || "Đăng kí thất bại");
      }
    } catch (error) {
      const err = error as {
        response?: { status: number; data?: { message?: string } };
      };
      if (err.response?.status === 400) {
        toast.error(err.response.data?.message || "Dữ liệu không hợp lệ");
      } else {
        toast.error("Không thể kết nối đến server");
      }
    } finally {
      set({ isSigningup: false });
    }
  },

  storeTempSignupData: (data) => {
    set({ tempSignupData: data });
  },
}));

export default useAuthStore;
