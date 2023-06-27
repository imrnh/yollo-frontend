import styles from '@/styles/auth.module.css';

export default function SignUp() {
    return <main className={styles.auth_wrapper}>
        <div className={styles.form_wrapper}>
            <h1 style={{marginTop: '70px', fontSize: '25px', alignSelf: 'center'}}>Create an account</h1>
            <form className={styles.auth_form} method="POST" action="">
                <input name="fname" type="text" placeholder='Full name' required /> <br />
                <input name="email" type="email" placeholder='Email' required /> <br />
                <input name="password" type="password" placeholder='Password' required /> <br />
                <div style={{width: '1px', height: '6px'}}></div>
                <label for="dob" style={{ fontSize: '12px', marginLeft: '13px', color: 'gray', zIndex: '10'}}>Date of birth</label>
                <input style={{marginTop: '-7px', zIndex: '-1', borderTop: '0'}} name="date" type="date" placeholder='date' id="dob" required /> <br />
                <button type='submit'>Signup</button>
            </form>
            <div className={styles.redirect_to_diffr}>
                <a href="/auth/signin" style={{color: 'gray'}}>Already have an account?</a>
            </div>
        </div>
    </main>
}