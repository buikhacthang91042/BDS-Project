import styles from "./authen.module.css";
import LoginForm from "@/components/AuthForm/LoginForm";
import hinhNen from "../../assets/hinhNen.jpg";
import Image from "next/image";
export default function AuthenPage() {
  return (
    <div className={styles.authPage}>
      <div className={styles.leftPanel}>
        <LoginForm />
      </div>
      <div className={styles.rightPanel}>
        <video autoPlay muted loop playsInline className={styles.bgVideo}>
          <source src="/bgVideo.mp4" type="video/mp4" />
        </video>

        <div className={styles.textBox}>
          <h1>Plan , travel and enjoy</h1>
          <p>
            You will never know every thing <br /> But you will know more.
          </p>
        </div>
      </div>
    </div>
  );
}
