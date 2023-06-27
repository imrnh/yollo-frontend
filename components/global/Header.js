import styles from '@/styles/navbar.module.css';

export default function Header() {
    return <main className={styles.navbar}>
        <img className={styles.logo} src="/logo.png" />

        <div className={styles.nav_inner}>
            <ul>
                <li>
                    <div className={styles.search_bar}>
                        <form action="" method="">
                            <input type='text' placeholder='Quick Search' name="Searchbar" />
                            <button type='submit'></button>
                        </form>
                    </div>
                </li>
                <li>
                    <select className={styles.genres_dropdown}>
                        <option>Genre</option>
                        {/* Load genres using api request. */}
                    </select>
                </li>
                <li><button className={styles.nav_inner_mtv_buttns}><a  href='/home/movies' style={{color: 'gray'}}>Movies</a></button> </li>
                <li><button className={styles.nav_inner_mtv_buttns}><a  href='/home/tvshows' style={{color: 'gray'}}>TV Shows</a></button></li>
                <li>
                    <div className={styles.profile}>
                        <select className={styles.profile_dropdown}>
                            <option>My account</option>
                        </select>
                    </div>
                </li>
            </ul>








        </div>
    </main>
}