import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/index.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Yollo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.ico" />
      </Head>

      <div className={styles.index_cover}>
        <video /* autoPlay */ muted className={styles.background_video} >
          <source src='/videos/videoplayback.webm' />
        </video>
        <div className={styles.video_overlay}></div>
        <div className={styles.logo_signin}>
          <img src="/logo.png" />
          <div className={styles.lsi_navbar}>
            <ul>
              <li><a href='/pricing'>Pricing</a></li>
              <li><a href='/auth/signin'><button type="button">Signin</button></a></li>
            </ul>            
          </div>
        </div>
        <div className={styles.index_conver_contents}>
          <h1>Unlimited movies, TV shows, and more</h1>
          <h3>Plans now start at USD2.99/month.</h3>

          <div className={styles.input_form}>
            <form action='' method='POST'>
              <input type='email' name='email' placeholder='Email' required className={styles.landing_input} />
              <button type='submit' className={styles.landing_submit_btn}>Get Started</button>
            </form>
            <p className={styles.already_have_an_acc}>*Already have an account?<a href="/auth/signup">Login</a></p>
          </div>
        </div>
      </div>
    </>
  )
}
