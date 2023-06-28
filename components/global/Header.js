import styles from '@/styles/navbar.module.css';

export default function Header() {
    return <main className={styles.navbar}>
        <img className={styles.logo} src="/logo.png" />

        <div className={styles.nav_middle}>
            <div style={{backgroundColor: "black"}} className={styles.search_bar}>
                <form action="" method="">
                    <input type='text' placeholder='Quick Search' name="Searchbar" />
                    <button type='submit'>Search</button>
                </form>
            </div>
        </div>
        <div className={styles.nav_inner}>
            <ul>
                <li>
                </li>
                <li><button className={styles.nav_inner_mtv_buttns}><a href='/home/movies' style={{ color: 'gray' }}>Movies</a></button> </li>
                <li><button className={styles.nav_inner_mtv_buttns}><a href='/home/tvshows' style={{ color: 'gray' }}>Shows</a></button></li>
                <li>
                    <select className={styles.genres_dropdown}>
                        <option>Genre</option>
                        {/* Load genres using api request. */}
                    </select>
                </li>
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