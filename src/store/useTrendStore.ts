import { create } from "zustand";
import { axiosTrend } from "../lib/axios";
import { toast } from "react-toastify";

interface Hotspot {
  _id: string;
  count: number;
  avgPrice: number;
}

interface Trend {
  _id: { year: number; month: number; location: string };
  avgPrice: number;
  count: number;
}

interface TrendState {
  hotspots: Hotspot[];
  trend: Trend[];
  loading: boolean;
  error: string | null;
}

interface TrendAction {
  fetchHotspots: (province?: string) => Promise<void>;
  fetchPriceTrends: (province?: string) => Promise<void>;
  clearError: () => void;
}

const useTrendStore = create<TrendState & TrendAction>((set) => ({
  hotspots: [],
  trend: [],
  loading: false,
  error: null,
  fetchHotspots: async (province?: string) => {
    set({ loading: true, error: null });
    try {
      let url = "/hotspot";
      if (province && province !== "Việt Nam") {
        url += `?province=${encodeURIComponent(province)}`;
      }
      const res = await axiosTrend.get(url);
      if (res.status === 200) {
        set({ hotspots: res.data.data });
      } else {
        const errorMessage = res.data.message || "Không thể lấy dữ liệu";
        set({ error: errorMessage });
        toast.error(errorMessage);
      }
    } catch (error) {
      const err = error as {
        response?: { status: number; data?: { message?: string } };
      };
      const errorMessage =
        err.response?.data?.message || "Không thể kết nối đến server";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },
  fetchPriceTrends: async (province?: string) => {
    set({ loading: true, error: null });
    try {
      let url = "/price-trends";
      if (province && province !== "Việt Nam ") {
        url += `?province=${encodeURIComponent(province)}`;
      }
      const res = await axiosTrend.get(url);
      if (res.status === 200) {
        set({ trend: res.data.data });
      } else {
        const errorMessage =
          res.data.message || "Không thể lấy dữ liệu xu hướng giá";
        set({ error: errorMessage });
        toast.error(errorMessage);
      }
    } catch (error) {
      const err = error as {
        response?: { status: number; data?: { message?: string } };
      };
      const errorMessage =
        err.response?.data?.message || "Không thể kết nối đến server";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },
  clearError: () => {
    set({ error: null });
  },
}));
export default useTrendStore;
