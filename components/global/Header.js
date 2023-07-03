import styles from '@/styles/navbar.module.css';
import getRequest from '@/utilities/get_req';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { every } from 'rxjs';



export default function Header() {

    const [all_genres, setAllGenres] = useState([]);

    const [parental_activated, updateParentalActivated] = useState(false);


    const [isOpenG, setIsOpenG] = useState(false);
    const [isOpenMA, setIsOpenMA] = useState(false);

    const toggleDropdownG = () => {
        setIsOpenG(!isOpenG);

        //when one open, close other.
        if (isOpenMA) {
            setIsOpenMA(!isOpenMA);
        }
    };

    const toggleDropdownMA = () => {
        setIsOpenMA(!isOpenMA);
        //when one open, close other.
        if (isOpenG) {
            setIsOpenG(!isOpenG);
        }
    };

    useEffect(() => {
        getRequest("/home/allgenres")
            .then(response => {
                setAllGenres(response.genres)
            })
            .catch(error => alert(error));

        getRequest("/home/pctrlactivestatus").then(res => { updateParentalActivated(res.pctrl_status) }).catch(error => alert(error))
    }, []);

    const router = new useRouter();
    const handleSearchSubmit = event => {
        event.preventDefault();
        var search_query = event.target[0].value;
        var path = "/home/search/" + search_query;
        router.push(path);
    }

    const logoutHandler= () =>{
        Cookies.remove('token');
        Cookies.remove('role');

        router.push("/")
    }


    return <main className={styles.navbar}>
        <a href='/home/'><img className={styles.logo} src="/logo.png" /></a>

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
                    {parental_activated && (
                        <div className={styles.parental_control_indicator} style={{color: "brown", marginTop: "8px", float: "left"}}><img style={{width: "13px", height: "13px", marginRight: "6px"}} src='/icons/padlock.png' />Parental control activated</div>
                    )}
                </li>
                <li><button className={styles.nav_inner_mtv_buttns}><a href='/home/movies' style={{ color: 'gray' }}>Movies</a></button> </li>
                <li><button className={styles.nav_inner_mtv_buttns}><a href='/home/tvshows' style={{ color: 'gray' }}>Shows</a></button></li>
                <li>
                    <button onClick={toggleDropdownG} style={{ color: 'gray' }} className={styles.nav_inner_mtv_buttns}>Genres</button>
                    {isOpenG && (
                        <div className={styles.dropdown_content}>
                            {
                                all_genres.map(element => (
                                    <div style={{ marginTop: "10px" }}><a href={`home/movies?genre=${element.id}`}>{element.name}</a><br /></div>
                                ))
                            }
                            <div style={{ marginBottom: "20px" }}></div>
                        </div>
                    )}

                </li>
                <li>
                    <div className={styles.profile}>
                        <button onClick={toggleDropdownMA} style={{ color: "var(--global-btn-bg)" }} className={styles.nav_inner_mtv_buttns}>My Account</button>
                        {isOpenMA && (
                            <div className={styles.dropdown_content}>
                                <div style={{ marginTop: "10px" }}>
                                    <a href='/home/friends'>Friends</a> <br />
                                </div>
                                <div style={{ marginTop: "10px" }}>
                                    <a href='/home/parental-control'>Parental Control</a> <br />
                                </div>
                                <div style={{ marginTop: "10px" }}>
                                    <a href=''>Watch History</a> <br />
                                </div>
                                <div style={{ marginTop: "10px" }}>
                                    <a href=''>Watch Later</a> <br />
                                </div>

                                <div style={{ marginTop: "10px" }}>
                                    <a onClick={logoutHandler} style={{color: "brown"}}>Logout</a> <br />
                                </div>

                                <div style={{ marginBottom: "20px" }}></div>
                            </div>
                        )}
                    </div>
                </li>
            </ul>








        </div>
    </main>
}