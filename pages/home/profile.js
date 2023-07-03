import MiniMovieCard from '@/components/Home/small_movie_card';
import Header from '@/components/global/Header';
import styles from '@/styles/profile.module.css';
import getRequest from '@/utilities/get_req';
import { useEffect, useState } from 'react';


export default function Profile() {

    const [user_info, setUserInfo] = useState();

    const [watch_later_list, setWatchLaterList] = useState([]);
    const [watch_history_list, setWatchHistoryList] = useState([]);


    const [whl_public, toggleWhlPublic] = useState([]);

    useEffect(() => {
        getRequest("/home/myinfo")
            .then(res => setUserInfo(res))
            .catch(err => alert(err))

        getRequest("/home/watchlater")
            .then(res => {
                setWatchLaterList(res.response);
                console.log(res.response)
            })
            .catch(err => alert(err))

        getRequest("/home/watchhistory")
            .then(res => setWatchHistoryList(res.response))
            .catch(err => alert(err))

    }, []);


    useEffect(() => {
        getRequest("/home/watchhistoryandlaterstatus")
            .then(res => toggleWhlPublic(res.response))
            .catch(err => alert(err))
    }, [whl_public]);


    return <> <Header />
        <div className={styles.profile_wrapper}>
            <div className={styles.profile_info_section}>
                <h1>Profile of {user_info?.full_name} </h1>

                <p>{user_info?.email} - Dob: {user_info?.dob?.substring(0, 10)}</p>
            </div>

            <div style={{ width: "100%", height: "1px", backgroundColor: "gray" }}></div>

            <div className={styles.watch_later_wrapper}>
                <div className={styles.watch_later_name_n_toggle_button}>
                    <h1>Watch Later</h1>
                    <div style={{ color: "gray" }}>Visible to public &nbsp;&nbsp;
                        <input style={{ marginTop: "4px" }} type='checkbox' name="wl_public"
                            checked={whl_public[1]}
                            onChange={() => { getRequest("/home/triggerwhl?flag=wl&b=" + !whl_public[1]); alert("Watch Later" + (whl_public[1] ? " not " : " ") + "visible to public") }} />
                    </div>

                </div>  <br /> <br />
                <div className={styles.watch_later_content}>
                    {Array.isArray(watch_later_list) && watch_later_list.map(item => (
                        <MiniMovieCard
                            key={item.movie.id}
                            movie={item.movie}
                            publishers={item.publishers}
                            genres={item.genres}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>

            <br />
            <br />
            <br />

            <div style={{ width: "100%", height: "1px", backgroundColor: "gray" }}></div>

            <div className={styles.watch_later_wrapper}>
                <div className={styles.watch_later_name_n_toggle_button}>
                    <h1>Watch Later</h1>
                    <div style={{ color: "gray" }}>Visible to public &nbsp;&nbsp;
                        <input style={{ marginTop: "4px" }} type='checkbox' name="wl_public"
                            checked={whl_public[0]}
                            onChange={() => { getRequest("/home/triggerwhl?flag=wh&b=" + !whl_public[0]); alert("Watch Later" + (whl_public[0] ? " not " : " " )+ "visible to public") }} />
                    </div>

                </div>  <br /> <br />
                <div className={styles.watch_later_content}>
                    {Array.isArray(watch_history_list) && watch_history_list.map(item => (
                        <MiniMovieCard movie={item.movie}
                            publishers={item.publishers}
                            genres={item.genres}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>



        </div >


    </>
}