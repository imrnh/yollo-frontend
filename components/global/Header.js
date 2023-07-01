import styles from '@/styles/navbar.module.css';
import Router, { useRouter } from 'next/router'



export default function Header() {
    const router = new useRouter();
    const handleSearchSubmit = event => {
        event.preventDefault();
        var search_query = event.target[0].value;
        var path = "/home/search/" + search_query;
        router.push(path);
    }


    return <main className={styles.navbar}>
        <img className={styles.logo} src="/logo.png" />

        <div className={styles.nav_middle}>
            <div style={{ backgroundColor: "black" }} className={styles.search_bar}>
                <form method='POST' onSubmit={handleSearchSubmit}>
                    <input type='text' placeholder='Quick Search' name="searchbar" required />
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