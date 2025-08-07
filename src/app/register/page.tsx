import styles from './register.module.css';
import RegisterForm from '@/components/AuthForm/RegisterForm';
export default function RegisterPage() {
    return (
        <div className={styles.authPage}>
            <div className={styles.leftPanel}>
               <RegisterForm />
            </div>
            <div className={styles.rightPanel}>
                <video autoPlay muted loop playsInline className={styles.bgVideo}>
                    <source src="/bgVideo.mp4" type='video/mp4'/>
                </video>
                <div className={styles.textBox}>
                    <h1 >Plan , travel and enjoy</h1>
                    <p>You will never know every thing <br /> But you will know more.</p>

                </div>
            </div>
            
        </div>
    )

}