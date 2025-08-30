"use client";
import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import logo from "@/assets/logo.png";
import Image from "next/image";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import googleLogo from "../../assets/google.png";
import facebooklogo from "../../assets/facebook.png";
import backlogo from "../../assets/back.png";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login, fetchAuthUserFromToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const error = urlParams.get("error");
    if (error) {
      toast.error(
        error === "google_failed"
          ? "Đăng nhập bằng Google thất bại"
          : "Đăng nhập bằng Facebook thất bại"
      );
    } else if (token) {
      localStorage.setItem("authToken", token);
      fetchAuthUserFromToken();
      router.push("/");
    }
  }, [router, fetchAuthUserFromToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(phone, password, () => {
      router.push("/");
    });
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5001/api/auth/google";
  };

  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:5001/api/auth/facebook";
  };

  return (
    <div className={styles.container}>
      <div className={styles.backToDashBoard}>
        <a href="/" className={styles.buttonBackTitle}>
          <button type="button" className={styles.back}>
            <Image src={backlogo} alt="back" className={styles.iconBack} />
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
            <a href="/register" className={styles.register}>
              {" "}
              Đăng kí ngay{" "}
            </a>
          </label>
          <label>
            <a href="" className={styles.forgetPassword}>
              {" "}
              Quên mật khẩu?
            </a>
          </label>
        </div>
        <button type="submit" className={styles.loginbutton}>
          Đăng nhập
        </button>
        <div className={styles.divider}>
          <span>HOẶC</span>
        </div>
        <div className={styles.otherMethodLogin}>
          <button
            type="button"
            className={styles.google}
            onClick={handleGoogleLogin}
          >
            <Image
              src={googleLogo}
              alt="google"
              className={styles.iconOtherPlatform}
            />
            <p>Đăng nhập với Google</p>
          </button>
        </div>
        <div className={styles.otherMethodLogin}>
          <button
            type="button"
            className={styles.facebook}
            onClick={handleFacebookLogin}
          >
            <Image
              src={facebooklogo}
              alt="facebook"
              className={styles.iconOtherPlatform}
            />
            <p>Đăng nhập với Facebook</p>
          </button>
        </div>
      </form>
    </div>
  );
}
