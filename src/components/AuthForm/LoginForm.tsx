"use client";
import { useState } from "react";
import styles from "./Form.module.css";
import logo from "@/assets/logo.png";
import Image from "next/image";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import googleLogo from "../../assets/google.png";
import facebooklogo from "../../assets/facebook.png";
import backlogo from "../../assets/back.png";
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
      <div className={styles.backToDashBoard}>
        <a href="/" className={styles.buttonBackTitle}>
          <button type="button" className={styles.back}>
            <Image src={backlogo} alt="google" className={styles.iconBack} />
          </button>
          <p className={styles.backTitle}>Quay về trang chủ</p>
        </a>
      </div>
      <Image src={logo} alt="Logo" width={100} height={100} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Xin chào bạn 🛖</h3>
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
        <div className={styles.optionsLogin}>
          <label className={styles.navigateToRegis}>
            <p>Chưa là thành viên?</p>
            <a href="/register" className={styles.register}> Đăng kí ngay </a>
          </label>
          <label>
            <a href="" className={styles.forgetPassword}> Quên mật khẩu?</a>
          </label>
        </div>
        <button type="submit" className={styles.loginbutton}>
          Đăng nhập
        </button>
        <div className={styles.divider}>
          <span>HOẶC</span>
        </div>
        <div className={styles.otherMethodLogin}>
          <button type="button" className={styles.google}>
            <Image
              src={googleLogo}
              alt="google"
              className={styles.iconOtherPlatform}
            />
            <p>Đăng nhập với Google</p>
          </button>
        </div>
        <div className={styles.otherMethodLogin}>
          <button type="button" className={styles.facebook}>
            <Image
              src={facebooklogo}
              alt="google"
              className={styles.iconOtherPlatform}
            />
            <p>Đăng nhập với Facebook</p>
          </button>
        </div>
      </form>
    </div>
  );
}
