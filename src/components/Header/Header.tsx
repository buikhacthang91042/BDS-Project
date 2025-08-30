"use client";

import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import styles from "./Header.module.css";
import { log } from "console";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type MenuItem = {
  label: string;
  link?: string;
  children?: { label: string; link: string }[];
};
const menus: MenuItem[] = [
  {
    label: "Nhà đất bán",
    children: [
      { label: "Bán căn hộ chung cư", link: "/ban-can-ho-chung-cu" },
      { label: "Bán nhà riêng", link: "" },
      { label: "Bán nhà biệt thự , liền kề", link: "" },
      { label: "Bán nhà mặt phố", link: "" },
      { label: "Bán shophouse,nhà phố thương mại", link: "" },
      { label: "Bán đất nền dự án", link: "" },
      { label: "Bán đất", link: "" },
      { label: "Bán trang trại,khu nghỉ dưỡng", link: "" },
      { label: "Bán condotel", link: "" },
      { label: "Bán kho/nhà xưởng", link: "" },
      { label: "Bán loại bất động sản khác", link: "" },
    ],
  },
  {
    label: "Nhà đất cho thuê",
    children: [
      { label: "Cho thuê căn hộ chung cư", link: "" },
      { label: "Cho thuê nhà riêng", link: "" },
      { label: "Cho thuê nhà biệt thự,liền kề", link: "" },
      { label: "Cho thuê nhà mặt phố", link: "" },
      { label: "Cho thuê shop house,nhà phố thương mại", link: "" },
      { label: "Cho thuê nhà trọ,phòng trọ", link: "" },
      { label: "Cho thuê văn phòng", link: "" },
      { label: "Cho thuê, sang nhượng cửa hàng, kiot", link: "" },
      { label: "Cho thuê nhà kho, nhà xưởng, đất", link: "" },
      { label: "Cho thuê loại bất động sản khác", link: "" },
    ],
  },
  {
    label: "Dự án",
    children: [
      { label: "Căn hộ chung cư", link: "" },
      { label: "Cao ốc văn phòng", link: "" },
      { label: "Trung tâm thương mại", link: "" },
      { label: "Khu đô thị mới", link: "" },
      { label: "Khu phức hợp", link: "" },
      { label: "Nhà ở xã hội", link: "" },
      { label: "Khu nghỉ dưỡng, sinh thái", link: "" },
      { label: "Khu công nghiệp", link: "" },
      { label: "Biệt thự, liền kề", link: "" },
      { label: "Shophouse", link: "" },
      { label: "Nhà mặt phố", link: "" },
      { label: "Dự án khác", link: "" },
    ],
  },
  { label: "Tin tức", link: "" },

  {
    label: "Phân tích đánh giá",
    children: [
      { label: "Biểu đồ giá", link: "" },
      { label: "Điểm nóng, xu hướng thị trường", link: "/trends" },
      { label: "Báo cáo thị trường", link: "" },
      { label: "Góc nhìn chuyên gia", link: "" },
    ],
  },
  {
    label: "Danh bạ",
    children: [
      { label: "Nhà môi giới", link: "" },
      { label: "Doanh nghiệp", link: "" },
    ],
  },
];
export default function Header() {
  const { authUser, logout } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  const handlePostProperty = () => {
    if (!authUser) {
      toast.warning("Vui lòng đăng nhập trước khi kí gửi BĐS");
      router.push("/authen");
    } else {
      router.push("/post-property");
    }
  };
  return (
    <header className={styles.header}>
      <a href="/">
        <h2 className={styles.logo}>🏡 Bất Động Sản</h2>
      </a>

      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {menus.map((menu, i) => (
            <li key={i} className={styles.menuItem}>
              {menu.link ? (
                <Link href={menu.link}>{menu.label}</Link>
              ) : (
                <span>{menu.label}</span>
              )}
              {menu.children && (
                <ul className={styles.dropdown}>
                  {menu.children.map((child, j) => (
                    <li key={j}>
                      <Link href={child.link}>{child.label} </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {authUser ? (
        <div className={styles.userContainer}>
          <span className={styles.userName}>👤 {authUser.name}</span>
          <div className={styles.userMenu}>
            <Link href="">Cập nhật hồ sơ</Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Đăng xuất
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.optionsContinue}>
          <div className={styles.optionAuthenItem}>
            <Link href="/authen" className={styles.authLink}>
              Đăng nhập
            </Link>
          </div>
          |
          <div className={styles.optionAuthenItem}>
            <Link href="/register" className={styles.authLink}>
              Đăng kí
            </Link>
          </div>
          <div>
            <button onClick={handlePostProperty} className={styles.postNews}>
              Kí gửi BĐS
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
