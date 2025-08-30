"use client";
import { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import FilterModal from "../SearchBox/FilterModal";
import ProvinceDropdown from "../SearchBox/ProvinceDropdown";
const slides = [
  { image: "/images/banner01.jpg", link: "" },
  { image: "/images/banner02.jpg", link: "" },
  { image: "/images/banner03.jpg", link: "" },
];

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

export default function Banner() {
  const [currrentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const [type, setType] = useState<string[]>([]);
  const [price, setPrice] = useState("all");
  const [area, setArea] = useState("all");

  const [open, setOpen] = useState<null | "type" | "price" | "area">(null);
  const [province, setProvince] = useState("Hồ Chí Minh");

  useEffect(() => {
    const saveProvince = localStorage.getItem("selectedProvince");
    if (saveProvince) {
      setProvince(saveProvince);
    }
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(id);
  }, [paused]);

  const prev = () =>
    setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrentSlide((p) => (p + 1) % slides.length);

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
    <div
      className={styles.banner}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <a
          href={s.link}
          key={i}
          className={`${styles.slide} ${
            i === currrentSlide ? styles.active : ""
          }`}
          style={{ backgroundImage: `url(${s.image})` }}
        />
      ))}
      <button className={`${styles.navBtn} ${styles.prev}`} onClick={prev}>
        ❮
      </button>
      <button className={`${styles.navBtn} ${styles.next}`} onClick={next}>
        ❯
      </button>

      {/* Dot indicators */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${
              i === currrentSlide ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
