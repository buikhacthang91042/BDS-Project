"use client";

import { useState } from "react";
import styles from "./Form.module.css";
import Image from "next/image";
import logo from "@/assets/logo.png";
export default function RegisterForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className={styles.container}>
      <Image src={logo} alt="Logo" width={100} height={100} />
      <form className={styles.form}>
        <h3>Hey, Hello</h3>
        <p className={styles.smallTitle}>
          Nhập thông tin để đăng kí tài khoản.
        </p>
         <label>Họ tên</label>
        <input
          type="text"
          placeholder="Nhập họ tên..."
          value={name}
          onChange={(n) => setName(n.target.value)}
          required
        />
        <label>Số điện thoại</label>
        <input
          type="number"
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
         <label>Nhập lại mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={password}
          onChange={(rp) => setConfirmPassword(rp.target.value)}
          required
        />
        <div className={styles.options}>
          <label>
            <a href="/authen"> Đăng nhập </a>
          </label>
        </div>
        <button type="submit">Đăng kí</button>
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
