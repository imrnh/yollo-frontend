import Cookies from 'js-cookie';
import http from 'http';
import styles from '@/styles/auth.module.css';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export default function SignUp() {

    const [error, updateError] = useState();
    const [redirectNow, updateRedirectNow] = useState(false);
    const [isAdmin, updateIsAdmin] = useState(false);


    const router = useRouter();

    useEffect(() => {
        if (redirectNow || Cookies.get('token')) {
            if (isAdmin || (Cookies.get('role') == 2)) {
                router.push('/admin');
            } else {
                router.push('/home');
            }
        }
    }, [redirectNow]);


    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = JSON.stringify({
            email: event.target.email.value,
            password: event.target.password.value,
        })

        const options = {
            hostname: 'localhost',
            port: 5298,
            path: '/auth/signin',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                var response = JSON.parse(responseData);
                if (response.status_code == 200) {
                    try {
                        console.log(response)
                        Cookies.set('token', response.message[0], { expires: 30, path: '/' });
                        Cookies.set('role', response.message[1] == "user" ? 1 : 2, { expires: 30, path: '/' });

                        // updateIsAdmin(response.message[1] == "admin");
                        updateRedirectNow(true);

                    } catch (error) {
                        console.log(error)
                        updateError("Something went wrong. Please try again later.")
                    }
                } else {
                    //throw error.
                    updateError("ERROR: " + response.message)
                }
            });
        });

        req.on('error', (error) => {
            console.error('Error: ', error.message);
        });

        req.write(data);
        req.end();
    }


    return <main className={styles.auth_wrapper}>
        <div className={styles.form_wrapper}>
            <h1>Welcome back!</h1>
            <p className={styles.error_message}>{error}</p>
            <form onSubmit={handleSubmit} className={styles.auth_form} method="POST" action="">
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
                    <a href="/auth/signup" style={{ color: 'gray' }}>Don't have an account?</a>
                </center>
            </div>
        </div>
    </main>
}