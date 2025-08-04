'use client';
import { useState } from 'react';
import styles from './Form.module.css'
import logo from '@/assets/logo.png'; 
import Image from 'next/image';
export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className={styles.container}>
            <Image src = {logo} alt='Logo' width={100} height={100}/>
        <form className={styles.form}>
            <h3>Hey, Hello</h3>
            <p className={styles.smallTitle}>Nhập email và mật khẩu để đăng nhập.</p>

            <label >Email</label>
            <input type="email" placeholder="abc@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required />

            <label >Mật khẩu</label>
            <input type="password" placeholder='Nhập mật khẩu' value={password} onChange={p => setPassword(p.target.value)} required/>
            <div className={styles.options}>
                <label >
                    <a href=""> Đăng kí </a>
                   </label>
                <label >
                    <a href="">  Quên mật khẩu?</a>
                  </label>
            </div>
            <button type="submit">Đăng nhập</button>    
           <div className={styles.divider}>
                <span>HOẶC</span>
            </div>

            
            <button type="button" className={styles.google}>Đăng nhập với Google</button>
            <button type='button' className={styles.facebook}>Đăng nhập với Facebook</button>
            
        </form>
             </div>
    )
}

