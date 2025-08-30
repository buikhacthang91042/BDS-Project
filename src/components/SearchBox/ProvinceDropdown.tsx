"use client";
import { useState } from "react";
import styles from "./ProvinceDropdown.module.css";

const topProvinces = [
  { name: "Hà Nội", image: "/images/HaNoiLogo.jpg" },
  { name: "Hồ Chí Minh", image: "/images/HCMLogo.webp" },
  { name: "Đà Nẵng", image: "/images/DaNangLogo.png" },
  { name: "Bình Dương", image: "/images/BDLogo.jpg" },
  { name: "Hưng Yên", image: "/images/DongNaiLogo.jpg" },
  { name: "Khánh Hòa", image: "/images/KhanhHoaLogo.png" },
];
const allProvinces = [
  "An Giang",
  "Bà Rịa Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Cà Mau",
  "Cần Thơ",
  "Cao Bằng",
  "Đà Nẵng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Nội",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];

type Props = {
  selected: string;
  onSelect: (province: string) => void;
};

function ChunkProvinces(arr: string[], size: number) {
  const result: string[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function ProvinceDropdown({ selected, onSelect }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button className={styles.trigger} onClick={() => setOpen(!open)}>
        {selected} ▾
      </button>
      {open && (
        <div className={styles.menu}>
          <h4>Top các tỉnh/thành nổi bật</h4>
          <div className={styles.topCities}>
            {topProvinces.map((p) => (
              <div
                className={styles.cityCard}
                key={p.name}
                onClick={() => {
                  onSelect(p.name);
                  setOpen(false);
                }}
              >
                <img src={p.image} alt={p.name} />
                <span style={{ fontWeight: "bold" }}>{p.name}</span>
              </div>
            ))}
          </div>
          <h4>Tất cả các tỉnh thành</h4>
          <div className={styles.allCities}>
            {ChunkProvinces(allProvinces, 10).map((col, i) => (
              <ul key={i}>
                {col.map((p) => (
                  <li
                    key={p}
                    onClick={() => {
                      onSelect(p);
                      setOpen(false);
                    }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
