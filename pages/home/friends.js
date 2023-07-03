import Header from '@/components/global/Header';
import styles from '@/styles/profile.module.css';


export default function Friend(){



    return <>
    <Header />
    <div className={styles.friend_wrapper}>
        <div className={styles.toggle_div_wrapper}>
            <div className={styles.toogle_div_header}></div>
            <div className={styles.toogle_div_body}>
                
            </div>
        </div>
    </div>
    </>
}