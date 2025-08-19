"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInput, RegisterSchema } from "../../../schemas/registerSchema";
import styles from "./Form.module.css";
import Image from "next/image";
import logo from "@/assets/logo.png";
import useAuthStore from "../../store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import googleLogo from "../../assets/google.png";
import facebooklogo from "../../assets/facebook.png";
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
  const [agreeTermsError, setAgreeTermsError] = useState<string | null>(null);

  const onSubmit = (data: RegisterInput) => {
    setAgreeTermsError(null);
    const isChecked = (
      document.getElementById("agreeTerms") as HTMLInputElement
    ).checked;
    if (!isChecked) {
      setAgreeTermsError("Vui lòng xác nhận điều khoản dịch vụ.");
      return;
    }
    signUp(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      () => {
        router.push("/authen");
      }
    );
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3>Đăng kí</h3>
        <p className={styles.smallTitle}>
          Nhập thông tin để đăng kí tài khoản.
        </p>
        <div className={styles.otherMethod}>
          <div className={styles.otherItemAuthen}>
            <Image src={googleLogo} alt="google" />
            <button type="button" className={styles.google}>
              Đăng nhập với Google
            </button>
          </div>
          <div className={styles.otherItemAuthen}>
            <button type="button" className={styles.facebook}>
              Đăng nhập với Facebook
            </button>
          </div>
        </div>
        <div className={styles.divider}>
          <span>HOẶC</span>
        </div>
        <div className={styles.items}>
          <div className={styles.item}>
            <label>Họ đệm</label>
            <input {...register("firstName")} placeholder="Nhập họ đệm..." />
            {errors.firstName && (
              <span className={styles.validate}>
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className={styles.item}>
            <label>Tên</label>
            <input {...register("lastName")} placeholder="Nhập tên..." />
            {errors.lastName && (
              <span className={styles.validate}>{errors.lastName.message}</span>
            )}
          </div>
        </div>
        <label>Số điện thoại</label>
        <input
          {...register("phone")}
          type="tel"
          placeholder="Nhập số điện thoại..."
        />
        {errors.phone && (
          <span className={styles.validate}>{errors.phone.message}</span>
        )}
        <div className={styles.items}>
          <div className={styles.item}>
            <label>Mật khẩu</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Nhập mật khẩu"
            />
            {errors.password && (
              <span className={styles.validate}>{errors.password.message}</span>
            )}
          </div>
          <div className={styles.item}>
            <label>Nhập lại mật khẩu</label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Nhập lại mật khẩu"
            />
            {errors.confirmPassword && (
              <span className={styles.validate}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="agreeTerms" className={styles.checkbox} />
          <label htmlFor="agreeTerms">
            Bằng việc tạo tài khoản, bạn đồng ý với{" "}
            <a href="/terms">Điều khoản dịch vụ và Chính sách bảo mật </a>của
            chúng tôi.
          </label>
        </div>
        {agreeTermsError && (
          <span className={styles.validate}>{agreeTermsError}</span>
        )}
        <button type="submit">Đăng kí</button>
        <div className={styles.options}>
          <label>
            <a href="/authen"> Đăng nhập </a>
          </label>
        </div>
      </form>
    </div>
  );
}
