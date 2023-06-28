import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/global/Header';
import styles from '@/styles/Home.module.css';

export default function Home() {


    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get('token') || Cookies.get('role') == 2) {
            router.push('/auth/signin');
        }
    }, []);

    return (
        <main className={styles.home}>
            <Header />

            <div className={styles.featured_movie}>
                <video className={styles.featured_movie_banner}  muted>
                    <source src="/videos/videoplayback.webm" />
                </video>
            </div>
        </main>
    );
}