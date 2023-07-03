import MiniMovieCard from '@/components/Home/small_movie_card';
import Header from '@/components/global/Header';
import styles from '@/styles/profile.module.css';
import getRequest from '@/utilities/get_req';
import postRequest from '@/utilities/post_req';
import { useEffect, useState } from 'react';


export default function Profile() {

    const [user_info, setUserInfo] = useState();

    const [watch_later_list, setWatchLaterList] = useState([]);
    const [watch_history_list, setWatchHistoryList] = useState([]);

    const [whl_public, toggleWhlPublic] = useState([]);


    const [my_friends, setMyFriends] = useState([]);
    const [searchResForUsers, setSearchResForUsers] = useState([]);

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

        //read all my friends
        getRequest("/home/loadfriends")
            .then(res => setMyFriends(res.friends))
            .catch(error => alert("Error reading friends: " + error))

    }, []);


    useEffect(() => {
        getRequest("/home/watchhistoryandlaterstatus")
            .then(res => toggleWhlPublic(res.response))
            .catch(err => alert(err))
    }, [whl_public]);



    //friend search
    const friendSearchSubmHandler = event => {
        event.preventDefault();
        var searchKeyword = event.target[0].value;

        var path = "/home/searchfollower?keyword=" + searchKeyword;

        getRequest(path)
            .then(res => setSearchResForUsers(res.users))
            .catch(err => alert("Error searching friends: " + err))
    }


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
                            delete_path={"/home/deletemoviefromwatchlater?movie_id="}
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
                    <h1>Watch History</h1>
                    <div style={{ color: "gray" }}>Visible to public &nbsp;&nbsp;
                        <input style={{ marginTop: "4px" }} type='checkbox' name="wl_public"
                            checked={whl_public[0]}
                            onChange={() => { getRequest("/home/triggerwhl?flag=wh&b=" + !whl_public[0]); alert("Watch Later" + (whl_public[0] ? " not " : " ") + "visible to public") }} />
                    </div>

                </div>  <br /> <br />
                <div className={styles.watch_later_content}>
                    {Array.isArray(watch_history_list) && watch_history_list.map(item => (
                        <MiniMovieCard movie={item.movie}
                            publishers={item.publishers}
                            genres={item.genres}
                            rating={item.rating}
                            delete_path={"/home/deletemoviefromwatchhistory?movie_id="}
                        />
                    ))}
                </div>
            </div>



            <br />
            <br />
            <br />

            <div style={{ width: "100%", height: "1px", backgroundColor: "gray" }}></div>

            <div className={styles.friends_wrapper}>
                <div className={styles.friends_view_sec}>
                    <h2>My friends</h2> <br /> <br />
                    <div className={styles.friend_view_rendering_container}>
                        {my_friends?.map(friend => (
                            <div className={styles.friend_view_card}>
                                <p ><u style={{ color: "rgb(200, 200, 200)" }}>{friend.fullName}</u></p>
                                <button type="button"
                                    style={{ backgroundColor: "transparent", border: "0", color: "brown" }}
                                    onClick={() => {
                                        getRequest("/home/removefollower?fid=" + friend.id)
                                            .then(res => alert(res.message)).catch(err => alert("Error removing friend: " + err))
                                    }}>x Remove</button>
                            </div>
                        ))}

                    </div>
                </div>

                <div className={styles.friends_search_sec}>
                    <form onSubmit={friendSearchSubmHandler}>
                        * Search an user with email <br />< br />
                        <input placeholder='Email...' style={{ color: "black" }} type="text" name="fri_search_keyword" />
                        <button type="submit">Search</button>
                    </form> <br /> <br />


                    {searchResForUsers?.map(friend => (
                        <div className={styles.friend_view_card}>
                            <p ><u style={{ color: "rgb(200, 200, 200)" }}>{friend.fullName}</u></p>
                            <button type="button"
                                style={{ backgroundColor: "transparent", border: "0", color: "var(--global-btn-bg)" }}
                                onClick={() => {
                                    postRequest({id: friend.id},"/home/makefollower")
                                        .then(res => alert(res.message)).catch(err => alert("Error removing friend: " + err))
                                }}>+ Follow</button>
                        </div>
                    ))}


                </div>
            </div>


        </div >


    </>
}