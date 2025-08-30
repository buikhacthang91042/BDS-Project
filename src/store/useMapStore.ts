import { axiosMap } from "@/lib/axios";
import { create } from "zustand";
interface Listing {
  type: "Feature";
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    title: string;
    price: number;
    area: number;
    province: string;
    district: string;
    ward: string;
  };
}
interface MapStore {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  fetchingListing: (province?: string) => Promise<void>;
}
export const useMapStore = create<MapStore>((set) => ({
  listings: [],
  loading: false,
  error: null,
  fetchingListing: async (province?: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosMap.post("/listings", {
        province,
      });
      set({ listings: res.data.features, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Fetch failed", loading: false });
    }
  },
}));
export default useMapStore;
