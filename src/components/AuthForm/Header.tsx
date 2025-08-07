"use client";

import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import styles from "./Header.module.css";
import { log } from "console";
import { useRouter } from "next/navigation";
export default function Header() {
  const { authUser, logout } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>🏡 Bất Động Sản</h2>
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
        <Link href="/authen" className={styles.authLink}>
          Đăng nhập
        </Link>
      )}
    </header>
  );
}
