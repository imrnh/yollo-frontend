import styles from '@/styles/auth.module.css';

export default function SignUp() {
    return <main className={styles.auth_wrapper}>
        <div className={styles.form_wrapper}>
            <h1>Welcome back!</h1>
            <form className={styles.auth_form} method="POST" action="">
                <input name="email" type="email" placeholder='Email' required /> <br />
                <input name="password" type="password" placeholder='Password' required /> <br />
                <div className={styles.remember_me_sec}>
                    <input name='remember_me' type='checkbox' className={styles.checkbox} style={{ width: '15px', height: '15px' }} />
                    <p>Remember me</p></div>
                <button type='submit'>Login</button>
            </form>
            <div className={styles.forgot_pass_p}>
                <a href='/auth/forgot_password'>Forgot password?</a>
            </div>
            <div className={styles.redirect_to_diffr}>
                <center>
                    <a href="/auth/signup" style={{color: 'gray'}}>Don't have an account?</a>
                </center>
            </div>
        </div>
    </main>
}