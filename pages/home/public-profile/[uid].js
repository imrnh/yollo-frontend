import MiniMovieCard from '@/components/Home/small_movie_card';
import Header from '@/components/global/Header';
import styles from '@/styles/profile.module.css';
import getRequest from '@/utilities/get_req';
import { useEffect, useState } from 'react';


export default function Profile({ uid }) {


    console.log(uid);
    const [user_info, setUserInfo] = useState();
    const [wh_list, setWhList] = useState([]);
    const [wl_list, setWlList] = useState([]);


    useEffect(() => {

        getRequest("/home/friendprofileinfo?fid=" + uid)
            .then(res => {
                if (res.status == 399) { //if error
                    alert(res.message)
                }
                else {
                    setUserInfo(res.message);
                    
                }
            }).catch(err => alert("Error reading user info: " + err))


        getRequest("/home/friendswhllist?fid=" + uid)
            .then(res => {
                if (res.status == 399) { //if error
                    alert(res.message)
                }
                else {
                    setWhList(res.message.wh);
                    setWlList(res.message.wl);
                }
            })
            .catch(err => alert("Error reading wh and wl: " + err))
    }, []);


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


                </div>  <br /> <br />
                <div className={styles.watch_later_content}>
                    {wl_list.length <= 0 && (<p style={{ color: "brown", float: "center" }}>Nothing to see</p>)}
                    {Array.isArray(wl_list) && wl_list.length > 0 && wl_list.map(item => (
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


                </div>  <br /> <br />
                <div className={styles.watch_later_content}>
                    {wh_list.length <= 0 && (<p style={{ color: "brown", float: "center" }}>Nothing to see</p>)}
                    {Array.isArray(wh_list) && wh_list.map(item => (
                        <MiniMovieCard 
                            movie={item.movie}
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



export async function getServerSideProps(context) {
    const { params } = context;
    const { uid } = params;

    return {
        props: {
            uid,
        }
    };
}
