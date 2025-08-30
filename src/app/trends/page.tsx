"use client";
import React, { useEffect, useState } from "react";
import useTrendStore from "@/store/useTrendStore";
import styles from "../trends/trends.module.css";
import MapView from "@/components/MapView/MapView";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const getColor = (index: number) => {
  const colors = [
    "#1976d2",
    "#d32f2f",
    "#388e3c",
    "#f57c00",
    "#7b1fa2",
    "#c2185b",
    "#0288d1",
    "#fbc02d",
  ];
  return colors[index % colors.length];
};

type ChartDataItem = {
  month: string;
  [key: string]: number | string;
};

export default function TrendPage() {
  const { hotspots, trend, loading, error, fetchHotspots, fetchPriceTrends } =
    useTrendStore();
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showMap, setShowMap] = useState(false);
  const provinces = [
    "Tuyên Quang",
    "Lào Cai",
    "Thái Nguyên",
    "Phú Thọ",
    "Bắc Ninh",
    "Hưng Yên",
    "Hải Phòng",
    "Ninh Bình",
    "Quảng Trị",
    "Đà Nẵng",
    "Quảng Ngãi",
    "Gia Lai",
    "Khánh Hòa",
    "Lâm Đồng",
    "Đắk Lắk",
    "Hồ Chí Minh",
    "Đồng Nai",
    "Tây Ninh",
    "Cần Thơ",
    "Vĩnh Long",
    "Đồng Tháp",
    "Cà Mau",
    "An Giang",
    "Hà Nội",
    "Huế",
    "Lai Châu",
    "Điện Biên",
    "Sơn La",
    "Lạng Sơn",
    "Quảng Ninh",
    "Thanh Hóa",
    "Nghệ An",
    "Hà Tĩnh",
    "Cao Bằng",
  ];
  useEffect(() => {
    const saveSelectedProvince = localStorage.getItem("selectedProvince");
    if (saveSelectedProvince) {
      setSelectedProvince(saveSelectedProvince);
      setInputValue(saveSelectedProvince);
    } else {
      setSelectedProvince("Việt Nam");
    }
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filteredSuggestions = provinces.filter((prov) =>
        prov.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
      setSelectedProvince("Việt Nam");
      localStorage.removeItem("selectedProvince");
    }
  };

  const handleSuggestionSelect = (prov: string) => {
    setSelectedProvince(prov);
    setInputValue(prov);
    setSuggestions([]);
    localStorage.setItem("selectedProvince", prov);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchHotspots(
        selectedProvince === "Việt Nam" ? undefined : selectedProvince
      );
      await fetchPriceTrends(
        selectedProvince === "Việt Nam" ? undefined : selectedProvince
      );
    };
    if (selectedProvince) {
      fetchData();
    }
  }, [fetchHotspots, fetchPriceTrends, selectedProvince]);

  const locations = [...new Set(trend.map((t) => t.location))];
  const chartData = trend.reduce((acc: ChartDataItem[], t) => {
    const monthKey = `${t.month}/${t.year}`;
    const existing = acc.find((d) => d.month === monthKey);

    if (existing) {
      existing[t.location] = t.avg_price;
    } else {
      const entry: ChartDataItem = {
        month: monthKey,
        [t.location]: t.avg_price,
      };
      acc.push(entry);
    }

    return acc;
  }, []);

  const noData =
    hotspots.length === 0 && trend.length === 0 && selectedProvince !== "";

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <label htmlFor="province-input" className={styles.titleSearch}>
          NHẬP CHỌN TỈNH THÀNH ĐỂ XÁC ĐỊNH XU HƯỚNG TẠI THỜI ĐIỂM{" "}
        </label>
        <input
          id="province-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={() => setTimeout(() => setSuggestions([]), 200)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && suggestions.length > 0) {
              handleSuggestionSelect(suggestions[0]);
            }
          }}
          className={styles.searchInput}
          placeholder="Nhập tên tỉnh/thành phố..."
        />
        {suggestions.length > 0 && (
          <ul className={styles.suggestionsList}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionSelect(suggestion)}
                className={styles.suggestionItem}
                onMouseDown={(e) => e.preventDefault()}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && <div>Đang tải....</div>}
      {error && <div className={styles.error}> {error}</div>}
      {noData ? (
        <div className={styles.error}>
          Chưa có thông tin bất động sản nào tại đây
        </div>
      ) : (
        <>
          <div className={styles.card}>
            <div className={styles.headerHotspot}>
              <h2>
                Điểm nóng bất động sản{" "}
                {selectedProvince === "Việt Nam"
                  ? "Toàn quốc"
                  : selectedProvince}
              </h2>
              <button onClick={() => setShowMap((prev) => !prev)}>
                {showMap ? "TẮT BẢN ĐỒ" : "XEM BẢN ĐỒ"}
              </button>
            </div>
            {showMap ? (
              <MapView
                province={
                  selectedProvince !== "Việt Nam" ? selectedProvince : undefined
                }
              />
            ) : (
              <>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Khu vực</th>
                      <th>Số tin rao</th>
                      <th>Giá trung bình (tỷ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotspots.map((h, i) => (
                      <tr key={i}>
                        <td>{h.location}</td>
                        <td>{h.count}</td>
                        <td>{(h.avg_price / 1e9).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>

          <div className={styles.card}>
            <h2>
              Xu hướng giá trung bình theo tháng tại{" "}
              {selectedProvince === "Việt Nam" ? "Toàn quốc" : selectedProvince}
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `${(v / 1e9).toFixed(1)} tỷ`} />
                <Tooltip
                  formatter={(value: number) =>
                    `${(value / 1e9).toFixed(2)} tỷ`
                  }
                />
                <Legend />
                {locations.map((location, index) => (
                  <Line
                    key={location}
                    type="monotone"
                    dataKey={location}
                    name={location}
                    stroke={getColor(index)}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
