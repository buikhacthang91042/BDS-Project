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
      firstName: string;
      lastName: string;
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
  login: (
    phone: string,
    password: string,
    navigate: () => void
  ) => Promise<void>;
  logout: () => void;
  fetchAuthUserFromToken: () => Promise<void>;
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isSigningup: false,
  authUser: null,
  tempSignupData: null,
  logout: () => {
    localStorage.removeItem("authToken");
    set({ authUser: null });
    toast.success("Đăng xuất thành công");
  },

  login: async (phone, password, navigate) => {
    try {
      const res = await axiosInstance.post("/login", { phone, password });
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("authToken", token);
        set({ authUser: user });
        toast.success("Đăng nhập thành công");
        navigate();
      } else {
        toast.error(res.data.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      const err = error as {
        response?: { status: number; data?: { message?: string } };
      };
      if (err.response?.status === 400) {
        toast.error(
          err.response.data?.message || "Số điện thoại hoặc mật khẩu không đúng"
        );
      } else if (err.response?.status === 401) {
        toast.error("Số điện thoại hoặc mật khẩu không đúng");
      } else {
        toast.error("Không thể kết nối đến server");
      }
    }
  },
  signUp: async (data, navigate) => {
    set({ isSigningup: true });
    try {
      const res = await axiosInstance.post("/register", data);
      if (res.status === 201) {
        toast.success(res.data.message || "Đăng kí thành công");
        set({
          authUser: {
            name: `${data.firstName} ${data.lastName}`.trim(),
            phone: data.phone,
          },
        });
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
  fetchAuthUserFromToken: async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    try {
      const res = await axiosInstance.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        set({ authUser: res.data });
      }
    } catch (error) {
      console.error("Token hết hạn hoặc không hợp lệ");
      localStorage.removeItem("authToken");
      set({ authUser: null });
    }
  },
}));

export default useAuthStore;
