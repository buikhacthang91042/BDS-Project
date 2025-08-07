"use client";
import { useState } from "react";
import styles from "./Form.module.css";
import logo from "@/assets/logo.png";
import Image from "next/image";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(phone, password, () => {
      router.push("/");
    });
  };
  return (
    <div className={styles.container}>
      <Image src={logo} alt="Logo" width={100} height={100} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Hey, Hello</h3>
        <p className={styles.smallTitle}>
          Nhập số điện thoại và mật khẩu để đăng nhập.
        </p>

        <label>Số điện thoại</label>
        <input
          type="tel"
          placeholder="Nhập số điện thoại..."
          value={phone}
          onChange={(p) => setPhone(p.target.value)}
          required
        />

        <label>Mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(p) => setPassword(p.target.value)}
          required
        />
        <div className={styles.options}>
          <label>
            <a href="/register"> Đăng kí </a>
          </label>
          <label>
            <a href=""> Quên mật khẩu?</a>
          </label>
        </div>
        <button type="submit">Đăng nhập</button>
        <div className={styles.divider}>
          <span>HOẶC</span>
        </div>

        <button type="button" className={styles.google}>
          Đăng nhập với Google
        </button>
        <button type="button" className={styles.facebook}>
          Đăng nhập với Facebook
        </button>
      </form>
    </div>
  );
}
