"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInput, RegisterSchema } from "../../../schemas/registerSchema";
import styles from "./Form.module.css";
import Image from "next/image";
import logo from "@/assets/logo.png";
import useAuthStore from "../../store/useAuthStore";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { signUp } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    signUp(
      { name: data.name, phone: data.phone, password: data.password , 
        confirmPassword: data.confirmPassword},
      () => {
        router.push("/authen");
      }
    );
  };

  return (
    <div className={styles.container}>
      <Image src={logo} alt="Logo" width={100} height={100} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3>Hey, Hello</h3>
        <p className={styles.smallTitle}>Nhập thông tin để đăng kí tài khoản.</p>
        <label>Họ tên</label>
        <input {...register("name")} placeholder="Nhập họ tên..." />
        {errors.name && <span className={styles.validate}>{errors.name.message}</span>}
        <label>Số điện thoại</label>
        <input {...register("phone")} type="tel" placeholder="Nhập số điện thoại..." />
        {errors.phone && <span className={styles.validate}>{errors.phone.message}</span>}
        <label>Mật khẩu</label>
        <input {...register("password")} type="password" placeholder="Nhập mật khẩu" />
        {errors.password && <span className={styles.validate}>{errors.password.message}</span>}
        <label>Nhập lại mật khẩu</label>
        <input {...register("confirmPassword")} type="password" placeholder="Nhập lại mật khẩu" />
        {errors.confirmPassword && <span className={styles.validate}>{errors.confirmPassword.message}</span>}
        <div className={styles.options}>
          <label>
            <a href="/authen"> Đăng nhập </a>
          </label>
        </div>
        <button type="submit">Đăng kí</button>
        <div className={styles.divider}>
          <span>HOẶC</span>
        </div>
        <button type="button" className={styles.google}>Đăng nhập với Google</button>
        <button type="button" className={styles.facebook}>Đăng nhập với Facebook</button>
      </form>
    </div>
  );
}