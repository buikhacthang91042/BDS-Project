"use client";
import { useState } from "react";
import styles from "./SearchBox.module.css";
import FilterModal from "./FilterModal";
import ProvinceDropdown from "./ProvinceDropdown";

const propertyTypes = [
  {
    label: "Tất cả nhà đất",
    value: "all",
  },
  {
    label: "Nhà bán",
    value: "nha-ban",
    children: [
      { label: "Nhà riêng", value: "nha-rieng" },
      { label: "Biệt thự, liền kề", value: "biet-thu" },
      { label: "Nhà mặt phố", value: "nha-mat-pho" },
    ],
  },
  {
    label: "Căn hộ",
    value: "can-ho",
    children: [
      { label: "Chung cư", value: "chung-cu" },
      { label: "Mini, dịch vụ", value: "mini" },
    ],
  },
];

const areaOptions = [
  { label: "Tất cả diện tích", value: "all" },
  { label: "Dưới 50m²", value: "under-50" },
  { label: "50 - 100m²", value: "50-100" },
  { label: "100 - 200m²", value: "100-200" },
  { label: "Trên 200m²", value: "over-200" },
];

const priceOptions = [
  { label: "Tất cả mức giá", value: "all" },
  { label: "Dưới 1 tỷ", value: "under-1" },
  { label: "1 - 3 tỷ", value: "1-3" },
  { label: "3 - 5 tỷ", value: "3-5" },
  { label: "5 - 10 tỷ", value: "5-10" },
  { label: "Trên 10 tỷ", value: "over-10" },
];

export default function SearchBox() {
  const [type, setType] = useState<string[]>([]);
  const [price, setPrice] = useState("all");
  const [area, setArea] = useState("all");
  const [open, setOpen] = useState<null | "type" | "price" | "area">(null);
  const [province, setProvince] = useState("Hồ Chí Minh");

  const renderTypeLabel = () => {
    if (type.length === 0) return "Loại nhà đất";
    return propertyTypes
      .flatMap((o) => (o.children ? [o, ...o.children] : [o]))
      .filter((opt) => type.includes(opt.value) && opt.value !== "all")
      .map((opt) => opt.label)
      .join(", ");
  };

  const renderPriceLabel = () => {
    const found = priceOptions.find((o) => o.value === price);
    return found ? found.label : "Mức giá";
  };

  const renderAreaLabel = () => {
    const found = areaOptions.find((o) => o.value === area);
    return found ? found.label : "Diện tích";
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.filters}>
        <div className={styles.searchRow}>
          <ProvinceDropdown selected={province} onSelect={setProvince} />
          <input
            type="text"
            placeholder="Nhập địa điểm, khu vực cần tìm kiếm"
          />
          <button type="submit" className={styles.searchBtn}>
            Tìm kiếm
          </button>
        </div>
        <div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <button onClick={() => setOpen("type")}>{renderTypeLabel()}</button>
            {open === "type" && (
              <FilterModal
                title="Loại nhà đất"
                options={propertyTypes}
                type="checkbox"
                defaultSelected={type}
                onApply={(val) => {
                  setType(val);
                  setOpen(null);
                }}
                onClose={() => setOpen(null)}
              />
            )}
          </div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <button onClick={() => setOpen("price")}>
              {renderPriceLabel()}
            </button>
            {open === "price" && (
              <FilterModal
                title="Mức giá"
                options={priceOptions}
                type="radio"
                defaultSelected={[price]}
                onApply={(val) => {
                  setPrice(val[0] || "all");
                  setOpen(null);
                }}
                onClose={() => setOpen(null)}
              />
            )}
          </div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <button onClick={() => setOpen("area")}>{renderAreaLabel()}</button>
            {open === "area" && (
              <FilterModal
                title="Diện tích"
                options={areaOptions}
                type="radio"
                defaultSelected={[area]}
                onApply={(val) => {
                  setArea(val[0] || "all");
                  setOpen(null);
                }}
                onClose={() => setOpen(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
