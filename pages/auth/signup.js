import styles from '@/styles/auth.module.css';
import Cookies from 'js-cookie';
import http from 'http';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function SignUp() {

    const router = useRouter();
    const [error, updateError] = useState();
    const [redirectNow, updateRedirectNow] = useState(false);

    useEffect(() => {
        if (redirectNow || Cookies.get('token')) {
            if ((Cookies.get('role') == 2)) {
                router.push('/admin');
            } else {
                router.push('/home');
            }
        }
    }, [redirectNow]);

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = JSON.stringify({
            fullName: event.target.fname.value,
            email: event.target.email.value,
            password: event.target.password.value,
            dob: event.target.dob.value
        })

        const options = {
            hostname: 'localhost',
            port: 5298,
            path: '/auth/signup',
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
                        Cookies.set('token', response.message[0], { expires: 30, path: '/' });
                        Cookies.set('role', response.message[1] == "user" ? 1 : 2, { expires: 30, path: '/' });

                        //redirect to home. - if admin, send to admin dashboard.
                        updateRedirectNow(true);

                    } catch (error) {
                        console.log(error)
                        updateError("Something went wrong. Please try again later.")
                    }
                } else {
                    //throw error.
                    updateError(response.message)
                }
            });
        });

        req.on('error', (error) => {
            console.error('Error:', error.message);
        });

        req.write(data);
        req.end();

    }


    const redirectHandler = (isAuthenticated, isAdmin) => {
        if (!isAuthenticated) return;
        useEffect(() => {
            if (isAdmin) {
                router.push('/admin');
            }else{
                router.push('/home');
            }
        }, []);
    }


    return <main className={styles.auth_wrapper}>
        <div className={styles.form_wrapper}>
            <h1 style={{ marginTop: '70px', fontSize: '25px', alignSelf: 'center' }}>Create an account</h1>
            <p className={styles.error_message}>{error}</p>
            <form onSubmit={handleSubmit} className={styles.auth_form} method="POST" action="">
                <input name="fname" type="text" placeholder='Full name' required /> <br />
                <input name="email" type="email" placeholder='Email' required /> <br />
                <input name="password" type="password" placeholder='Password' required /> <br />
                <div style={{ width: '1px', height: '6px' }}></div>
                <label style={{ fontSize: '12px', marginLeft: '13px', color: 'gray', zIndex: '10' }}>Date of birth</label>
                <input style={{ marginTop: '-7px', zIndex: '-1', borderTop: '0' }} name="dob" type="date" placeholder='date' required /> <br />
                <button type='submit'>Signup</button>
            </form>
            <div className={styles.redirect_to_diffr}>
                <a href="/auth/signin" style={{ color: 'gray' }}>Already have an account?</a>
            </div>
        </div>
    </main>
}